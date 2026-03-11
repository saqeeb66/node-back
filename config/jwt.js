const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "arcotcabs_secret_key";

function generateToken(user) {
  return jwt.sign(
    {
      userId: user.userId,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken
};