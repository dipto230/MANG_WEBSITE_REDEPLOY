import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { products } = req.body;

    let total = 0;

    for (let item of products) {
      const product = await Product.findById(item.productId);
      total += product.price * item.quantity;
    }

    const order = await Order.create({
      user: userId,
      products: products.map((p) => ({
        product: p.productId,
        quantity: p.quantity,
      })),
      totalAmount: total,
    });

    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
