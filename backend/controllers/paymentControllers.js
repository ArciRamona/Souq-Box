import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req.body;

    //  Map order items to Stripe line items
    // const line_items = body?.orderItems?.map((item) => ({
    //   price_data: {
    //     currency: "usd",
    //     product_data: {
    //       name: item.name,
    //       images: [item.image],
    //       metadata: { productId: item.product },
    //     },
    //     unit_amount: item?.price * 100,
    //   },

    //   quantity: item?.quantity,
    // }));
    const orderItems = body?.orderItems || [];

    // Add shipping fee as a separate line item (e.g., $20)
    const shippingFee = {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping Fee",
        },
        unit_amount: 2000, // $20 shipping in cents
      },
      quantity: 1,
    };

    // Combine product items + shipping fee
    const line_items = [
      ...orderItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: { productId: item.product },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      shippingFee,
    ];

    const shippingInfo = body?.shippingInfo;
    const shipping_rate =
      body?.itemsPrice >= 200
        ? "shr_1R73BWDwcsyCCZwRO17y3S9J"
        : "shr_1R73CpDwcsyCCZwROHXzrW4T";

    // Create Stripe Checkout Session
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   mode: "payment",
    //   success_url: `${process.env.FRONTEND_URL}/me/orders`,
    //   cancel_url: `${process.env.FRONTEND_URL}`,
    //   customer_email: req?.user?.email,
    //   client_reference_id: req?.user?._id.toString(),
    //   metadata: {
    //     ...shippingInfo,
    //     itemsPrice: body?.itemsPrice,
    //   },
    //   shipping_options: [
    //     {
    //       shipping_rate,
    //     },
    //   ],
    //   line_items,
    // });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/me/orders`,
      cancel_url: `${process.env.FRONTEND_URL}`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id.toString(),
      metadata: {
        ...shippingInfo,
        itemsPrice: body?.itemsPrice,
      },
      line_items, // ✅ use the one that includes the shipping fee
    });

    console.log("Stripe Session Created:", session.url);

    res.status(200).json({
      url: session.url,
    });
  }
);
