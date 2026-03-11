const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/awsS3");

const BUCKET = "arcot-cabs-storage2026";

exports.uploadInvoice = async (invoiceId, pdfBuffer) => {

  const key = `invoices/${invoiceId}.pdf`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: pdfBuffer,
    ContentType: "application/pdf"
  });

  await s3.send(command);

  return `https://${BUCKET}.s3.ap-south-1.amazonaws.com/${key}`;
};