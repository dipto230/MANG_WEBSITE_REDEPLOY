import stripe from "../configs/stripe.js";
import Order from "../models/Order.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    await Order.create({
      user: session.metadata.userId,
      totalAmount: session.amount_total / 100,
      status: "completed",
    });
  }

  res.json({ received: true });
};
