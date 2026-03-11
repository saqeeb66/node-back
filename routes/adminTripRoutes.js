const router = require("express").Router();
const controller = require("../controllers/adminTripController");
const auth = require("../middleware/jwtMiddleware");
const adminTripController = require("../controllers/adminTripController");


router.post("/",auth,controller.createTrip);
router.get("/",auth,controller.getAllTrips);
router.get("/:tripId",auth,controller.getTrip);
router.post("/:tripId/assign/:driverId", adminTripController.assignDriver);


module.exports = router;