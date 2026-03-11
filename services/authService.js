const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const jwtUtil = require("../utils/jwtUtil");

exports.signup = async (request) => {

  const passwordHash = await bcrypt.hash(request.password, 10);

  const user = {
    userId: request.email,
    name: request.name,
    email: request.email,
    phone: request.phone,
    passwordHash: passwordHash,
    role: "USER",
    createdAt: Date.now()
  };

  await userRepository.save(user);

  const token = jwtUtil.generateToken(user.userId, user.role);

  return {
    userId: user.userId,
    role: user.role,
    token
  };
};

exports.login = async (request) => {

  const user = await userRepository.findByUserId(request.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const match = await bcrypt.compare(
    request.password,
    user.passwordHash
  );

  if (!match) {
    throw new Error("Invalid email or password");
  }

  const token = jwtUtil.generateToken(user.userId, user.role);

  return {
    userId: user.userId,
    role: user.role,
    token
  };
};