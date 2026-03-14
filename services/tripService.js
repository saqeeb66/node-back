const repo = require("../repositories/tripRepository");
const tripRepo = require("../repositories/tripRepository");
const driverRepo = require("../repositories/driverRepository");

/* ================= USER ================= */

exports.bookTrip = async (trip) => {
  return await repo.createTrip(trip);
};

exports.getUserTrips = async (userId) => {
  return await repo.findByUser(userId);
};

/* ================= ADMIN ================= */

exports.getAllTrips = async () => {
  return await repo.findAll();
};

exports.assignDriver = async (
  tripId,
  driverId,
  driverName,
  driverPhone,
  carType,
  carNumber
) => {

  const trip = await repo.findById(tripId);

  if (!trip) throw new Error("Trip not found");

  if (trip.status !== "PENDING")
    throw new Error("Trip not in PENDING state");

  trip.driverId = driverId;
  trip.driverName = driverName;
  trip.driverPhone = driverPhone;
  trip.driverCarType = carType;
  trip.driverCarNumber = carNumber;
  trip.status = "DRIVER_ASSIGNED";

  await repo.updateTrip(trip);

  const driver = await driverRepo.findById(driverId);

  driver.available = false;
  driver.currentTripId = tripId;

  await driverRepo.save(driver);
};


/* ================= DRIVER ================= */

exports.startTrip = async (
  tripId,
  driverId,
  startLocation,
  startKm,
  image
) => {

  const trip = await repo.findById(tripId);

  if (!trip) throw new Error("Trip not found");

  if (trip.driverId !== driverId)
    throw new Error("Driver not assigned");

  if (trip.status !== "DRIVER_ASSIGNED")
    throw new Error("Trip cannot start");

  trip.startLocation = startLocation;
  trip.startKm = startKm;
  trip.startTime = Date.now();
  trip.odometerImageUrl = image;
  trip.status = "TRIP_STARTED";

  await repo.updateStartTrip(trip);

  /* DRIVER SHOULD BE BUSY */

  const driver = await driverRepo.findById(driverId);

  driver.available = false;
  driver.currentTripId = tripId;

  await driverRepo.save(driver);
};


exports.holdTrip = async (tripId) => {

  const trip = await repo.findById(tripId);

  if (trip.status !== "TRIP_STARTED")
    throw new Error("Trip cannot hold");

  await repo.updateStatus(tripId, "TRIP_ON_HOLD");

  /* DRIVER BECOMES AVAILABLE */

  const driver = await driverRepo.findById(trip.driverId);

  driver.available = true;
  driver.currentTripId = null;

  await driverRepo.save(driver);
};


exports.resumeTrip = async (tripId) => {

  const trip = await repo.findById(tripId);

  if (trip.status !== "TRIP_ON_HOLD")
    throw new Error("Trip cannot resume");

  await repo.updateStatus(tripId, "TRIP_STARTED");

  /* DRIVER BUSY AGAIN */

  const driver = await driverRepo.findById(trip.driverId);

  driver.available = false;
  driver.currentTripId = tripId;

  await driverRepo.save(driver);
};


exports.endTrip = async (
  tripId,
  endLocation,
  endKm,
  endImage,
  signature
) => {

  const trip = await repo.findById(tripId);

  if (trip.status !== "TRIP_STARTED")
    throw new Error("Trip cannot end");

  trip.endLocation = endLocation;
  trip.endKm = endKm;
  trip.endTime = Date.now();
  trip.endOdometerImageUrl = endImage;
  trip.signatureUrl = signature;
  trip.status = "TRIP_COMPLETED";

  await repo.updateEndTrip(trip);

  /* DRIVER AVAILABLE AGAIN */

  const driver = await driverRepo.findById(trip.driverId);

  driver.available = true;
  driver.currentTripId = null;

  await driverRepo.save(driver);
};


/* ================= GET TRIP ================= */

exports.getTripById = async (tripId) => {

  const trip = await repo.findById(tripId);

  if (!trip)
    throw new Error("Trip not found");

  return trip;
};
