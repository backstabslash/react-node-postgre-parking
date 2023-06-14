const Router = require("express");
const router = new Router();
const ParkingSlotController = require("../contollers/parking-controller");

router.post("/parkingslot", ParkingSlotController.createParkingSlot);

router.get("/parkingslots", ParkingSlotController.getParkingSlots);
router.get("/id/:id", ParkingSlotController.getParkingSlotByID);
router.get("/username/id/:id", ParkingSlotController.getUsernameBySlot);
router.get("/slot/plate/:plate", ParkingSlotController.getSlotByVehiclePlate);

router.delete("/id/:id", ParkingSlotController.deleteSlotByID);

router.put("/id/:id", ParkingSlotController.putSlotByID);
router.patch("/id/:id", ParkingSlotController.patchParkingSlotStatusByID);

module.exports = router;
