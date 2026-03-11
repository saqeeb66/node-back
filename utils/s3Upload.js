const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");

exports.uploadOdometer = async (buffer, tripId) => {

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `odometers/${tripId}-${Date.now()}.jpg`,
    Body: buffer,
    ContentType: "image/jpeg"
  };

  await s3.send(new PutObjectCommand(params));

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
};