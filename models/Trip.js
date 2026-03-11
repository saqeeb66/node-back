const { v4: uuidv4 } = require("uuid");

class Trip {
  constructor(data = {}) {

    /* ================= IDENTIFIERS ================= */
    this.tripId = data.tripId ?? uuidv4();

    /* ================= USER INFO ================= */
    this.userId = data.userId ?? null;
    this.userName = data.userName ?? null;
    this.userPhone = data.userPhone ?? null;

    /* ================= BOOKING ================= */
    this.pickupLocation = data.pickupLocation ?? null;
    this.dropLocation = data.dropLocation ?? null;
    this.vehicleType = data.vehicleType ?? null;
    this.tripNotes = data.tripNotes ?? null;

    this.travelDate = data.travelDate ?? null;
    this.passengers = data.passengers ?? null;
    this.numberOfDays = data.numberOfDays ?? null;

    /* ================= STATUS ================= */
    this.status = data.status ?? "REQUESTED";

    /* ================= DRIVER INFO ================= */
    this.driverId = data.driverId ?? null;
    this.driverName = data.driverName ?? null;
    this.driverPhone = data.driverPhone ?? null;
    this.driverCarType = data.driverCarType ?? null;
    this.driverCarNumber = data.driverCarNumber ?? null;

    /* ================= TRIP EXECUTION ================= */
    this.startLocation = data.startLocation ?? null;
    this.startKm = data.startKm ?? null;
    this.startTime = data.startTime ?? null;

    this.endLocation = data.endLocation ?? null;
    this.endKm = data.endKm ?? null;
    this.endTime = data.endTime ?? null;

    /* ================= DRIVER ACTIONS ================= */
    this.signatureUrl = data.signatureUrl ?? null;

    /* ================= DRIVER PROOF ================= */
    this.odometerImageUrl = data.odometerImageUrl ?? null;
    this.endOdometerImageUrl = data.endOdometerImageUrl ?? null;

    /* ================= ADMIN ================= */
    this.adminComment = data.adminComment ?? null;

    /* ================= AUDIT ================= */
    this.createdAt = data.createdAt ?? Date.now();
  }

  /* ================= CLEAN DYNAMODB OBJECT ================= */
  toItem() {
    const item = {};

    for (const key in this) {
      const value = this[key];

      if (
        value !== null &&
        value !== undefined &&
        !(typeof value === "string" && value.trim() === "")
      ) {
        item[key] = value;
      }
    }

    return item;
  }
}

module.exports = Trip;