import Stripe from "stripe";
import Order from "../models/order.js"; // ✅ Make sure this path is correct

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // ⚠️ this works only with body-parser.raw!
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ CHECKOUT SESSION COMPLETED EVENT
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Checkout session completed!");

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        {
          limit: 100,
        }
      );

      const orderItems = lineItems.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        price: item.amount_total / item.quantity / 100,
        image: "", // Optional: include if stored in metadata
        product: null, // Optional: include if stored in metadata
      }));

      await Order.create({
        user: session.client_reference_id,
        paymentMethod: "Card",
        paymentInfo: {
          id: session.payment_intent,
          status: "Paid",
          amount: session.amount_total / 100,
          currency: session.currency,
          created_at: new Date(),
        },
        itemsPrice: Number(session.metadata?.itemsPrice || 0),
        shippingAmount: Number(session.metadata?.shippingAmount || 0),
        taxAmount: Number(session.metadata?.taxAmount || 0),
        totalAmount: session.amount_total / 100,
        shippingInfo: {
          address: session.metadata?.address || "",
          city: session.metadata?.city || "",
          phoneNo: session.metadata?.phoneNo || "",
          zipCode: session.metadata?.zipCode || "",
          country: session.metadata?.country || "",
        },
        orderItems,
      });

      console.log(
        `✅ Order saved to MongoDB for user: ${session.client_reference_id}`
      );
    } catch (error) {
      console.error("❌ Error saving order:", error.message);
    }
  }

  res.status(200).json({ received: true });
};

// 👉 You can now create your MongoDB order here
// 🔥 Create the order in your DB here
// You can use session.client_reference_id (userId), session.customer_email, etc.

// For example:
// await Order.create({ user: session.client_reference_id, ... })
