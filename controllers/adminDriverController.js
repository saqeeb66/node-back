const driverService = require("../services/driverService");

exports.createDriver = async (req,res)=>{

  try{
    await driverService.createDriverWithUser(req.body);
    res.json({message:"Driver created"});
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
};


exports.getAvailableDrivers = async(req,res)=>{

  const drivers = await driverService.getAvailableDrivers();

  res.json(drivers);
};