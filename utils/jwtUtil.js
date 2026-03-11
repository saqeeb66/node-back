const jwt = require("jsonwebtoken");

const SECRET =
  process.env.JWT_SECRET || "ARCOT_CABS_SECRET_2026_ARCOT_CABS_SECRET_2026";

exports.generateToken = (userId, role) => {

  return jwt.sign(
    {
      sub: userId,
      role: "ROLE_" + role
    },
    SECRET,
    { expiresIn: "24h" }
  );

};

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};