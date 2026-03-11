const dynamo = require("../config/dynamo");

const TABLE = "Users";

exports.save = async (user) => {

  const params = {
    TableName: TABLE,
    Item: {
      userId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      passwordHash: user.passwordHash,
      role: user.role,
      createdAt: user.createdAt
    }
  };

  await dynamo.put(params).promise();
};

exports.findByUserId = async (userId) => {

  const params = {
    TableName: TABLE,
    Key: {
      userId: userId
    }
  };

  const result = await dynamo.get(params).promise();

  return result.Item || null;
};

exports.existsByEmail = async (email) => {

  const user = await this.findByUserId(email);
  return user != null;
};