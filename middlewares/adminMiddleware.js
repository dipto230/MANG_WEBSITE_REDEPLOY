import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata.role !== "admin") {
      return res.json({ success: false, message: "Admin Access Only" });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
 