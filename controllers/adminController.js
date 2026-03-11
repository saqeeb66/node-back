const tripService = require("../services/tripService");
const driverService = require("../services/driverService");
const signatureService = require("../services/signatureService");
const TripStatus = require("../models/enums/TripStatus");

/* ================= DRIVER ================= */

// Create Driver
exports.createDriver = async (req, res) => {
  try {
    await driverService.createDriverWithUser(req.body);
    res.json({ message: "Driver created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Available Drivers
exports.getAvailableDrivers = async (req, res) => {
  try {
    const drivers = await driverService.getAvailableDrivers();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign Driver
exports.assignDriver = async (req, res) => {
  try {
    const { tripId, driverId } = req.params;

    await driverService.assignDriverToTrip(tripId, driverId);

    res.json({ message: "Driver assigned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= TRIPS ================= */

// Create Trip
exports.createTrip = async (req, res) => {
  try {
    const trip = req.body;

    trip.status = TripStatus.PENDING;
    trip.createdAt = Date.now();

    const tripId = await tripService.bookTrip(trip);

    res.json({ tripId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await tripService.getAllTrips();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Trip By Id
exports.getTripById = async (req, res) => {
  try {
    const trip = await tripService.getTripById(req.params.tripId);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= SIGNATURE ================= */

exports.getSignature = async (req, res) => {
  try {
    const image = await signatureService.getSignature(req.params.tripId);

    if (!image) {
      return res.status(404).send();
    }

    res.setHeader("Content-Type", "image/png");
    res.send(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};