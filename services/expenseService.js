const expenseRepo = require("../repositories/expenseRepository");
const tripRepo = require("../repositories/tripRepository");
const driverRepo = require("../repositories/driverRepository");

const { v4: uuidv4 } = require("uuid");

/* ADD EXPENSE */

exports.addExpense = async (expense, driverUserId) => {

  const trip = await tripRepo.findById(expense.tripId);

  if (!trip)
    throw new Error("Trip not found");


  if (
    trip.status !== "TRIP_STARTED" &&
    trip.status !== "TRIP_ON_HOLD"
  )
    throw new Error("Trip not active");


  const driver = await driverRepo.findByUserId(driverUserId);

  if (!driver)
    throw new Error("Driver profile not found");


  if (driver.driverId !== trip.driverId)
    throw new Error("Driver not assigned to this trip");


  expense.expenseId = uuidv4();
  expense.addedBy = driverUserId;
  expense.createdAt = Date.now();

  await expenseRepo.addExpense(expense);

};


/* GET TRIP EXPENSES */

exports.tripExpenses = async (tripId) => {

  return await expenseRepo.getByTrip(tripId);

};