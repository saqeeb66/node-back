const express = require("express");
const router = express.Router();

const userTripController = require("../controllers/userTripController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, userTripController.bookTrip);

router.get("/", authMiddleware, userTripController.getUserTrips);

router.get("/active", authMiddleware, userTripController.getActiveTrip);

router.get("/:tripId", authMiddleware, userTripController.getTripById);

module.exports = router;