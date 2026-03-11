const dynamo = require("../config/dynamo");

const TABLE = "Drivers";

/* SAVE DRIVER */
exports.save = async (driver) => {

  await dynamo.put({
    TableName: TABLE,
    Item: driver
  }).promise();
};


/* FIND AVAILABLE DRIVERS */
exports.findAvailableDrivers = async () => {

  const result = await dynamo.scan({
    TableName: TABLE
  }).promise();

  return (result.Items || []).filter(d => d.available === true);
};


/* FIND BY ID */
exports.findById = async (driverId) => {

  const result = await dynamo.scan({
    TableName: TABLE
  }).promise();

  return (result.Items || []).find(d => d.driverId === driverId) || null;
};


/* FIND BY EMAIL */
exports.findByEmail = async (email) => {

  const result = await dynamo.scan({
    TableName: TABLE
  }).promise();

  return (result.Items || []).find(d => d.email === email) || null;
};


/* FIND BY USER ID */
exports.findByUserId = async (userId) => {

  const result = await dynamo.scan({
    TableName: TABLE
  }).promise();

  return (result.Items || []).find(d => d.userId === userId) || null;
};


/* EXISTS BY EMAIL */
exports.existsByEmail = async (email) => {

  const driver = await this.findByEmail(email);
  return driver !== null;
};