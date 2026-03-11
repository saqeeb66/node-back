const router = require("express").Router();
const upload = require("../middleware/uploadMiddleware");

const signatureController =
  require("../controllers/driverSignatureController");

const odometerController =
  require("../controllers/driverOdometerController");


router.post(
  "/signature/:tripId",
  signatureController.uploadSignature
);

router.get(
  "/signature/:tripId",
  signatureController.getSignature
);

router.post(
  "/odometer/start/:tripId",
  upload.single("file"),
  odometerController.uploadStartOdometer
);

router.post(
  "/odometer/end/:tripId",
  upload.single("file"),
  odometerController.uploadEndOdometer
);

module.exports = router;