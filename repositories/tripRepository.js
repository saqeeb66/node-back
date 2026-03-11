const dynamo = require("../config/dynamo");
const { v4: uuidv4 } = require("uuid");

const TABLE = "Trips";

/* CREATE TRIP */
exports.createTrip = async (trip) => {

  const tripId = uuidv4();

  trip.tripId = tripId;
  trip.status = "PENDING";
  trip.createdAt = Date.now();

  await dynamo.put({
    TableName: TABLE,
    Item: trip
  }).promise();

  return tripId;
};


/* FIND ALL */
exports.findAll = async () => {

  const result = await dynamo.scan({
    TableName: TABLE
  }).promise();

  return result.Items || [];
};


/* FIND BY USER */
exports.findByUser = async (userId) => {

  const trips = await this.findAll();

  return trips
    .filter(t => t.userId === userId)
    .sort((a,b)=> b.createdAt - a.createdAt);
};


/* FIND BY ID */
exports.findById = async (tripId) => {

  const result = await dynamo.get({
    TableName: TABLE,
    Key: { tripId }
  }).promise();

  return result.Item || null;
};


/* UPDATE STATUS */
exports.updateStatus = async (tripId, status) => {

  await dynamo.update({
    TableName: TABLE,
    Key: { tripId },
    UpdateExpression: "SET #status = :status",
    ExpressionAttributeNames: { "#status":"status" },
    ExpressionAttributeValues: { ":status": status }
  }).promise();
};


/* START TRIP */
exports.updateStartTrip = async (trip) => {

  await dynamo.update({
    TableName: TABLE,
    Key: { tripId: trip.tripId },
    UpdateExpression:
      "SET startLocation=:l, startKm=:k, startTime=:t, odometerImageUrl=:img, #status=:s",
    ExpressionAttributeNames: { "#status":"status" },
    ExpressionAttributeValues: {
      ":l": trip.startLocation,
      ":k": trip.startKm,
      ":t": trip.startTime,
      ":img": trip.odometerImageUrl,
      ":s": trip.status
    }
  }).promise();
};

exports.assignDriver = async (trip) => {

  await dynamo.update({
    TableName: "Trips",
    Key: {
      tripId: trip.tripId
    },
    UpdateExpression: `
      SET driverId = :driverId,
          driverName = :driverName,
          driverPhone = :driverPhone,
          driverCarType = :driverCarType,
          driverCarNumber = :driverCarNumber,
          #status = :status
    `,
    ExpressionAttributeNames: {
      "#status": "status"
    },
    ExpressionAttributeValues: {
      ":driverId": trip.driverId,
      ":driverName": trip.driverName,
      ":driverPhone": trip.driverPhone,
      ":driverCarType": trip.driverCarType,
      ":driverCarNumber": trip.driverCarNumber,
      ":status": trip.status
    }
  }).promise();

};


/* END TRIP */
exports.updateEndTrip = async (trip) => {

  await dynamo.update({
    TableName: TABLE,
    Key: { tripId: trip.tripId },
    UpdateExpression:
      "SET endLocation=:l, endKm=:k, endTime=:t, endOdometerImageUrl=:img, signatureUrl=:sig, #status=:s",
    ExpressionAttributeNames: { "#status":"status" },
    ExpressionAttributeValues: {
      ":l": trip.endLocation,
      ":k": trip.endKm,
      ":t": trip.endTime,
      ":img": trip.endOdometerImageUrl,
      ":sig": trip.signatureUrl,
      ":s": trip.status
    }
  }).promise();
};