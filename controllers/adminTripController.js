const tripService = require("../services/tripService");

exports.createTrip = async (req,res)=>{

  try{
    const tripId = await tripService.bookTrip(req.body);
    res.json(tripId);
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
};

exports.assignDriver = async (req, res) => {
  try {

    const { tripId, driverId } = req.params;

    await tripService.assignDriver(tripId, driverId);

    res.json({ message: "Driver assigned successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Driver assignment failed" });
  }
};

exports.getAllTrips = async(req,res)=>{
  const trips = await tripService.getAllTrips();
  res.json(trips);
};

exports.getTrip = async(req,res)=>{
  const trip = await tripService.getTripById(req.params.tripId);
  res.json(trip);
};