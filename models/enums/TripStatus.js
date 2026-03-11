const TripStatus = Object.freeze({
    PENDING: "PENDING",
    DRIVER_ASSIGNED: "DRIVER_ASSIGNED",
    TRIP_STARTED: "TRIP_STARTED",
    TRIP_ON_HOLD: "TRIP_ON_HOLD",
    TRIP_COMPLETED: "TRIP_COMPLETED",
    CANCELLED: "CANCELLED"
  });
  
  module.exports = TripStatus;