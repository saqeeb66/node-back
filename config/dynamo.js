const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports = dynamo;