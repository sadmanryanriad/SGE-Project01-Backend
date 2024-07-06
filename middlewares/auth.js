const authUser = (req, res, next) => {
    const user = req.headers["user"];
    if (!user) {
      return res.status(403).json("No user provided");
    }
  
    // Simulating user fetching from database
    req.user = { username: user, role: "admin" }; // replace this with actual user fetching logic
  
    next();
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
  