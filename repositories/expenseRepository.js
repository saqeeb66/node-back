const dynamo = require("../config/dynamo");

const TABLE = "Expenses";

/* ADD EXPENSE */
exports.addExpense = async (expense) => {

  await dynamo.put({
    TableName: TABLE,
    Item: expense
  }).promise();

};


/* GET EXPENSES BY TRIP */
exports.getByTrip = async (tripId) => {

  const result = await dynamo.scan({
    TableName: TABLE
  }).promise();

  return (result.Items || []).filter(
    e => e.tripId === tripId
  );

};