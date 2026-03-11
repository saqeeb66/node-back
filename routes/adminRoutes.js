const express = require("express");
const router = express.Router();

const admin = require("../controllers/adminController");

/* ================= DRIVER ================= */

router.post("/drivers/add", admin.createDriver);

router.get("/drivers/available", admin.getAvailableDrivers);

router.post(
  "/drivers/assign/:tripId/:driverId",
  admin.assignDriver
);

/* ================= TRIPS ================= */

router.post("/trips", admin.createTrip);

router.get("/trips", admin.getAllTrips);

router.get("/trips/:tripId", admin.getTripById);

router.post(
  "/trips/:tripId/assign/:driverId",
  admin.assignDriver
);

/* ================= SIGNATURE ================= */

router.get("/signature/:tripId", admin.getSignature);

module.exports = router;