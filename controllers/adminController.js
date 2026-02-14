import { clerkClient } from "@clerk/express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";


export const updateRoleToAdmin = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "admin",
      },
    });

    res.json({ success: true, message: "You are now Admin" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
