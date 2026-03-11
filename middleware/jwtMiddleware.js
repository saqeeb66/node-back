const jwt = require("jsonwebtoken");

const SECRET =
  process.env.JWT_SECRET || "ARCOT_CABS_SECRET_2026_ARCOT_CABS_SECRET_2026";

module.exports = (req, res, next) => {

  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = {
      userId: decoded.sub,
      role: decoded.role
    };

    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};