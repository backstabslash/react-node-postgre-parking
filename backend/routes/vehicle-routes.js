const Router = require('express');
const router = new Router();
const VehicleController = require('../contollers/vehicle-controller');

router.post('/vehicle', VehicleController.createVehicle);

router.get('/vehicles', VehicleController.getVehicles);
router.get('/vehicle/id/:id', VehicleController.getVehicleByID);

router.delete('/vehicle/id/:id', VehicleController.deleteVehicleByID);

router.put('/vehicle/id/:id', VehicleController.putVehicleByID);

module.exports = router;