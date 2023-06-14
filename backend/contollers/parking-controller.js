const db = require("../db-config");

class ParkingSlotController {
  // post parking slot
  async createParkingSlot(req, res) {
    const { vehicle_category, price, status = "available" } = req.body;
    const newSlot = await db(req.body.role).query(
      `insert into Parking_Slot (vehicle_category, price, status) values ($1, $2, $3) returning *`,
      [vehicle_category, price, status]
    );
    res.json(newSlot);
  }

  // delete discount by id
  async deleteSlotByID(req, res) {
    const deletedSlot = await db(req.body.role).query(
      `with deleted_bookings as (
      delete from booking
      where booking.slot_id = $1
      returning *
      )
      delete from parking_slot
      where slot_id = $1
      returning *;`,
      [req.params.id]
    );
    res.json(deletedSlot);
  }

  // update whole discount by id
  async putSlotByID(req, res) {
    const { vehicle_category, price } = req.body;
    const updatedSlot = await db(req.body.role).query(
      `update Parking_Slot set vehicle_category = $1, price = $2 where Parking_Slot.slot_id = $3 returning *`,
      [vehicle_category, price, req.params.id]
    );
    res.json(updatedSlot);
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

  // update status of slot by id
  async patchParkingSlotStatusByID(req, res) {
    db(req.body.role).query(
      `update Parking_Slot set status = $1 where Parking_Slot.slot_id = $2`,
      [req.body.status, req.body.slot_id]
    );
  }

  // find username by slot
  async getUsernameBySlot(req, res) {
    const username = await db(req.body.role).query(
      `select u.username from booking b 
    join vehicle v on b.vehicle_id = v.vehicle_id 
    join users u on v.user_id = u.user_id 
    where b.slot_id = $1
    and (b.status = 'ongoing' or b.status = 'upcoming');`,
      [req.params.id]
    );
    res.json(username);
  }

  // find slot by vehicle
  async getSlotByVehiclePlate(req, res) {
    const slot = await db(req.body.role).query(
      `select b.slot_id from booking_status b
      join vehicle v on b.vehicle_id = v.vehicle_id
      where v.plate_number = $1
      and b.status <> 'canceled'
      and b.status <> 'completed'`,
      [req.params.plate]
    );
    res.json(slot);
  }
}

module.exports = new ParkingSlotController();
