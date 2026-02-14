import stripe from "../configs/stripe.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.auth.userId;

    const lineItems = [];

    for (let item of products) {
      const product = await Product.findById(item.productId);

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100, // Stripe takes cents
        },
        quantity: item.quantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      metadata: {
        userId,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
