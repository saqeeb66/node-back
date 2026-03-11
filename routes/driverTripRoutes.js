const router = require("express").Router();
const controller = require("../controllers/driverTripController");
const auth = require("../middleware/jwtMiddleware");

router.get("/", auth, controller.getActiveTrips);
router.get("/completed", auth, controller.getCompletedTrips);
router.post("/:tripId/start",auth,controller.startTrip);
router.post("/:tripId/end",auth,controller.endTrip);

module.exports = router;
