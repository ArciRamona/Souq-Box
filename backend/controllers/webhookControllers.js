import Stripe from "stripe";
import Order from "../models/order.js";
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// js
export const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw body required for signature verification
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("✅ Stripe Event:", event.type);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Checkout session completed:", session.id);

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      // Map to Order format
      const orderItems = lineItems.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        price: item.amount_total / item.quantity / 100,
        image: "default.jpg", // ✅ temp value
        product: "65f2340fc123a96d5a123456", // ✅ TEMP valid product ID from your DB
      }));

      // Create Order with required fields
      await Order.create({
        user: new mongoose.Types.ObjectId(session.client_reference_id), // ✅ This sets the Order.user field // Assuming you store user ID in Stripe metadata
        paymentMethod: "Card", // Assuming payment was via Card
        orderItems,
        itemsPrice: Number(session.metadata?.itemsPrice || 0),
        shippingAmount: Number(session.metadata?.shippingAmount || 0),
        taxAmount: Number(session.metadata?.taxAmount || 0),
        totalAmount: session.amount_total / 100, // Convert to dollars
        shippingInfo: {
          address: session.metadata?.address || "Default Address", // Fallback if empty
          city: session.metadata?.city || "Default City", // Fallback if empty
          phoneNo: session.metadata?.phoneNo || "Default Phone", // Fallback if empty
          zipCode: session.metadata?.zipCode || "00000", // Fallback if empty
          country: session.metadata?.country || "US", // Fallback if empty
        },
        paymentInfo: {
          id: session.payment_intent,
          status: "Paid",
          amount: session.amount_total / 100,
          currency: session.currency,
          created_at: new Date(),
        },
      });

      console.log(
        `✅ Order saved to MongoDB for user: ${session.client_reference_id}`
      );
    } catch (error) {
      console.error("❌ Order creation failed:", error.message);
    }
  }

  res.status(200).json({ received: true });
};

// 👉 You can now create your MongoDB order here
// 🔥 Create the order in your DB here
// You can use session.client_reference_id (userId), session.customer_email, etc.

// For example:
// await Order.create({ user: session.client_reference_id, ... })
