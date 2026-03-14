const tripService = require("../services/tripService");
const driverRepo = require("../repositories/driverRepository");

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

    // 🔹 get driver details
    const driver = await driverRepo.findById(driverId);

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    await tripService.assignDriver(
      tripId,
      driverId,
      driver.name,
      driver.phone,
      driver.carType,
      driver.carNumber
    );

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
