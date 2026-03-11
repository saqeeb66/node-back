const router = require("express").Router();
const auth = require("../middleware/jwtMiddleware");

const controller =
  require("../controllers/adminDriverController");

/* CREATE DRIVER */
router.post(
  "/",
  auth,
  controller.createDriver
);

/* GET AVAILABLE DRIVERS */
router.get(
  "/available",
  auth,
  controller.getAvailableDrivers
);

module.exports = router;