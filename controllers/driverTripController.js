const tripService = require("../services/tripService");
const driverService = require("../services/driverService");

exports.startTrip = async (req, res) => {

  const driverEmail = req.user.userId;

  const driverId = await driverService.getDriverIdByEmail(driverEmail);

  const { startLocation, startKm, startOdometerImageUrl } = req.body;

  await tripService.startTrip(
    req.params.tripId,
    driverId,
    startLocation,
    startKm,
    startOdometerImageUrl
  );

  res.json({ message: "Trip started" });
};


/* ACTIVE TRIPS */

exports.getActiveTrips = async (req, res) => {
  try {
    const trips = await driverService.getActiveTripsForDriver(req.user.userId);
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


/* COMPLETED TRIPS */

exports.getCompletedTrips = async (req, res) => {
  try {
    const trips = await driverService.getCompletedTripsForDriver(req.user.userId);
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


/* HOLD TRIP */

exports.holdTrip = async (req, res) => {
  try {
    await tripService.holdTrip(req.params.tripId);
    res.json({ message: "Trip on hold" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


/* RESUME TRIP */

exports.resumeTrip = async (req, res) => {
  try {
    await tripService.resumeTrip(req.params.tripId);
    res.json({ message: "Trip resumed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


/* END TRIP */

exports.endTrip = async (req, res) => {

  const { endLocation, endKm, endOdometerImageUrl, signatureUrl } = req.body;

  await tripService.endTrip(
    req.params.tripId,
    endLocation,
    endKm,
    endOdometerImageUrl,
    signatureUrl
  );

  res.json({ message: "Trip completed" });
};