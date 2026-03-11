const driverRepo = require("../repositories/driverRepository");
const tripRepo = require("../repositories/tripRepository");
const userRepo = require("../repositories/userRepository");

const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

/* ================= CREATE DRIVER ================= */

exports.createDriverWithUser = async (req) => {

  const exists = await userRepo.existsByEmail(req.email);

  if (exists) throw new Error("User already exists");

  const passwordHash = await bcrypt.hash(req.password, 10);

  const user = {
    userId: req.email,
    name: req.name,
    email: req.email,
    phone: req.phone,
    passwordHash,
    role: "DRIVER",
    createdAt: Date.now()
  };

  await userRepo.save(user);

  const driver = {
    driverId: uuidv4(),
    userId: req.email,
    name: req.name,
    email: req.email,
    phone: req.phone,
    carType: req.carType,
    carNumber: req.carNumber,
    available: true,
    currentTripId: null
  };

  await driverRepo.save(driver);
};


/* ================= AVAILABLE DRIVERS ================= */

exports.getAvailableDrivers = async () => {

  return await driverRepo.findAvailableDrivers();
};


/* ================= ASSIGN DRIVER ================= */

exports.assignDriverToTrip = async (tripId, driverId) => {

  const trip = await tripRepo.findById(tripId);
  if (!trip) throw new Error("Trip not found");

  if (trip.status !== "PENDING")
    throw new Error("Trip already assigned");

  const driver = await driverRepo.findById(driverId);
  if (!driver) throw new Error("Driver not found");

  if (!driver.available)
    throw new Error("Driver not available");

  trip.driverId = driver.driverId;
  trip.driverName = driver.name;
  trip.driverPhone = driver.phone;
  trip.driverCarType = driver.carType;
  trip.driverCarNumber = driver.carNumber;
  trip.status = "DRIVER_ASSIGNED";

  await tripRepo.updateStatus(tripId, "DRIVER_ASSIGNED");

  driver.available = false;
  driver.currentTripId = tripId;

  await driverRepo.save(driver);
};


/* ================= DRIVER TRIPS ================= */

exports.getActiveTripsForDriver = async (driverUserId) => {

  const driver = await driverRepo.findByUserId(driverUserId);
  if (!driver) throw new Error("Driver not found");

  const trips = await tripRepo.findAll();

  return trips.filter(t =>
    t.driverId === driver.driverId &&
    (
      t.status === "DRIVER_ASSIGNED" ||
      t.status === "TRIP_STARTED" ||
      t.status === "TRIP_ON_HOLD"
    )
  );
};


exports.getCompletedTripsForDriver = async (driverUserId) => {

  const driver = await driverRepo.findByUserId(driverUserId);
  if (!driver) throw new Error("Driver not found");

  const trips = await tripRepo.findAll();

  return trips.filter(t =>
    t.driverId === driver.driverId &&
    t.status === "TRIP_COMPLETED"
  );
};


/* ================= DRIVER STATE ================= */

exports.markDriverAvailableOnHold = async (driverUserId) => {

  const driver = await driverRepo.findByUserId(driverUserId);
  if (!driver) throw new Error("Driver not found");

  driver.available = true;

  await driverRepo.save(driver);
};


exports.markDriverUnavailableOnResume = async (driverUserId, tripId) => {

  const driver = await driverRepo.findByUserId(driverUserId);
  if (!driver) throw new Error("Driver not found");

  driver.available = false;
  driver.currentTripId = tripId;

  await driverRepo.save(driver);
};


exports.markDriverAvailableOnCompletion = async (driverUserId) => {

  const driver = await driverRepo.findByUserId(driverUserId);
  if (!driver) throw new Error("Driver not found");

  driver.available = true;
  driver.currentTripId = null;

  await driverRepo.save(driver);
};


exports.getDriverIdByEmail = async (email) => {

  const driver = await driverRepo.findByEmail(email);

  if (!driver) throw new Error("Driver profile not found");

  return driver.driverId;
};