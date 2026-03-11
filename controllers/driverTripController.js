const tripService = require("../services/tripService");

exports.startTrip = async(req,res)=>{

  const driverId = req.user.userId;

  const {startLocation,startKm,startOdometerImageUrl} = req.body;

  await tripService.startTrip(
    req.params.tripId,
    driverId,
    startLocation,
    startKm,
    startOdometerImageUrl
  );

  res.json({message:"Trip started"});
};

exports.getActiveTrips = async (req, res) => {
  try {
    const trips = await tripService.getActiveTripsForDriver(req.user.userId);
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCompletedTrips = async (req, res) => {
  try {
    const trips = await tripService.getCompletedTripsForDriver(req.user.userId);
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.endTrip = async(req,res)=>{

  const {endLocation,endKm,endOdometerImageUrl,signatureUrl} = req.body;

  await tripService.endTrip(
    req.params.tripId,
    endLocation,
    endKm,
    endOdometerImageUrl,
    signatureUrl
  );

  res.json({message:"Trip completed"});
};
