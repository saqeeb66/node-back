const tripService = require("../services/tripService");

exports.bookTrip = async (req, res) => {
    try {

        const userId = req.user.sub; // from JWT
        const trip = req.body;

        trip.userId = userId; // attach logged-in user

        const tripId = await tripService.bookTrip(trip);

        res.json(tripId);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to book trip" });
    }
};

exports.getUserTrips = async (req, res) => {
    try {

        const userId = req.user.userId;

        const trips = await tripService.getUserTrips(userId);

        res.json(trips);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch trips" });
    }
};

exports.getActiveTrip = async (req, res) => {
    try {

        const userId = req.user.userId;

        const trips = await tripService.getUserTrips(userId);

        const active = trips.find(t =>
            t.status === "PENDING" ||
            t.status === "DRIVER_ASSIGNED" ||
            t.status === "TRIP_STARTED" ||
            t.status === "TRIP_ON_HOLD"
        );

        res.json(active || null);

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch active trip" });
    }
};

exports.getTripById = async (req, res) => {
    try {

        const tripId = req.params.tripId;

        const trip = await tripService.getTripById(tripId);

        res.json(trip);

    } catch (err) {
        res.status(500).json({ error: "Trip not found" });
    }
};