const Router = require('express');
const router = new Router();
const ParkingSlotController = require('../contollers/parking-controller');
router.post('/parkingslot', ParkingSlotController.createParkingSlot);
router.get('/parkingslot', ParkingSlotController.getParkingSlots);

module.exports = router;