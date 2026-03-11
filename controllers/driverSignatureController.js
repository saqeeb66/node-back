const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/awsS3");

const BUCKET = process.env.AWS_S3_BUCKET;
const REGION = process.env.AWS_REGION;

exports.uploadSignature = async (req, res) => {

  try {

    const tripId = req.params.tripId;

    if (!req.body || !req.body.signature) {
      return res.status(400).json({
        error: "Signature data missing"
      });
    }

    let base64 = req.body.signature;

    if (base64.includes(",")) {
      base64 = base64.split(",")[1];
    }

    const imageBuffer = Buffer.from(base64, "base64");

    const key = `signatures/${tripId}.png`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: imageBuffer,
      ContentType: "image/png"
    });

    await s3.send(command);

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    res.json(url);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Signature upload failed"
    });

  }

};

exports.getSignature = async (req, res) => {
  try {

    const tripId = req.params.tripId;

    const key = `signatures/${tripId}.png`;

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    res.redirect(url);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch signature" });
  }
};