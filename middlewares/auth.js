const User = require("../models/user");

const authUser = async (req, res, next) => {
  const userEmail = req.headers["token"];

  if (!userEmail) {
    return res.status(403).json("No user provided");
  }

  try {
    // Fetch user from database based on email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Assign fetched user data to req.user
    req.user = {
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json("Internal Server Error");
  }
};

const authorizeRole = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json("You do not have permission to access this resource");
    }
    next();
  };
};

module.exports = {
  authUser,
  authorizeRole,
};