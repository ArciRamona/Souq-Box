import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req.body;

    const orderItems = body?.orderItems || [];

    // 🧠 INSERT HERE — check if user is authenticated
    console.log("🧠 Stripe Checkout: Logged in user ID:", req.user?._id);

    const shippingFee = {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping Fee",
        },
        unit_amount: 2000,
      },
      quantity: 1,
    };

    const line_items = [
      ...orderItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: {
              productId: item.product,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      shippingFee,
    ];

    const shippingInfo = body?.shippingInfo;

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   mode: "payment",
    //   line_items,
    //   success_url: `${process.env.FRONTEND_URL}/me/orders`,
    //   cancel_url: `${process.env.FRONTEND_URL}`,
    //   customer_email: req?.user?.email,
    //   client_reference_id: req.user._id.toString(), // ✅ This depends on above log being defined
    //   metadata: {
    //     itemsPrice: body.itemsPrice,
    //     shippingAmount: body.shippingAmount,
    //     taxAmount: body.taxAmount,
    //     address: shippingInfo?.address || "Default Address",
    //     city: shippingInfo?.city || "Default City",
    //     phoneNo: shippingInfo?.phoneNo || "0000000000",
    //     zipCode: shippingInfo?.zipCode || "00000",
    //     country: shippingInfo?.country || "US",
    //   },
    // });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items, // your mapped items here
      success_url: `${process.env.FRONTEND_URL}/me/orders`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      customer_email: req.user?.email, // ✅ From JWT or session
      client_reference_id: req.user?._id.toString(), // ✅ This will be used in webhook
      metadata: {
        itemsPrice: body.itemsPrice,
        shippingAmount: body.shippingAmount,
        taxAmount: body.taxAmount,
        address: shippingInfo.address,
        city: shippingInfo.city,
        phoneNo: shippingInfo.phoneNo,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country,
      },
    });

    console.log("✅ Stripe Session Created:", session.url);

    res.status(200).json({
      url: session.url,
    });
  }
);
