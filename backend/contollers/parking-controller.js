const db = require("../db-config");

class ParkingSlotController {
  // post parking slot
  async createParkingSlot(req, res) {
    const { vehicle_category, price, status } = req.body;
    const newSlot = await db(req.body.role).query(
      `insert into Parking_Slot (vehicle_category, price, status) values ($1, $2, $3)`,
      [vehicle_category, price, status]
    );
    res.json(newSlot);
  }

  // get all slots
  async getParkingSlots(req, res) {
    const allSlots = await db().query(
      `select * from slot_status order by slot_id`
    );
    res.json(allSlots);
  }

  // get single slot by id
  async getParkingSlotByID(req, res) {
    const singleSlot = await db(req.body.role).query(
      `select * from Parking_Slot where Parking_Slot.slot_id = $1`,
      [req.body.slot_id]
    );
    res.json(singleSlot);
  }

  // delete slot by id
  async deleteParkingSlotByID(req, res) {
    db(req.body.role).query(
      `delete from Parking_Slot where Parking_Slot.slot_id = $1`,
      [req.body.slot_id]
    );
  }

  // update status of slot by id
  async patchParkingSlotStatusByID(req, res) {
    db(req.body.role).query(
      `update Parking_Slot set status = $1 where Parking_Slot.slot_id = $2`,
      [req.body.status, req.body.slot_id]
    );
  }
}

module.exports = new ParkingSlotController();
