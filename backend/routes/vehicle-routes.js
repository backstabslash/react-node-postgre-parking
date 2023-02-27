const Router = require("express");
const router = new Router();
const VehicleController = require("../contollers/vehicle-controller");

router.post("/vehicle", VehicleController.createVehicle);

router.get("/vehicles", VehicleController.getVehicles);
router.get("/id/:id", VehicleController.getVehicleByID);
router.get("/username/:username", VehicleController.getVehiclesByUsername);

router.delete("/id/:id", VehicleController.deleteVehicleByID);

router.put("/id/:id", VehicleController.putVehicleByID);

module.exports = router;
