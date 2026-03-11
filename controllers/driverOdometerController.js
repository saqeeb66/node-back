const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/awsS3");

const BUCKET = process.env.S3_BUCKET;
const REGION = process.env.AWS_REGION;

/* START ODOMETER */

exports.uploadStartOdometer = async (req, res) => {

  try {

    const tripId = req.params.tripId;
    const file = req.file;

    const key = `odometers/start/${tripId}.jpg`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    });

    await s3.send(command);

    const url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

    res.json(url);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Start odometer upload failed"
    });

  }

};


/* END ODOMETER */

exports.uploadEndOdometer = async (req, res) => {

  try {

    const tripId = req.params.tripId;
    const file = req.file;

    const key = `odometers/end/${tripId}.jpg`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    });

    await s3.send(command);

    const url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

    res.json(url);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "End odometer upload failed"
    });

  }

};
