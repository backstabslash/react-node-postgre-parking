const Router = require("express");
const router = new Router();
const ParkingSlotController = require("../contollers/parking-controller");

router.post("/parkingslot", ParkingSlotController.createParkingSlot);

router.get("/parkingslots", ParkingSlotController.getParkingSlots);
router.get("/parkingslot/id/:id", ParkingSlotController.getParkingSlotByID);

router.delete(
  "/parkingslot/id/:id",
  ParkingSlotController.deleteParkingSlotByID
);

router.patch(
  "/parkingslot/id/:id",
  ParkingSlotController.patchParkingSlotStatusByID
);

module.exports = router;
