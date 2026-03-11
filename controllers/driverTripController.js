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