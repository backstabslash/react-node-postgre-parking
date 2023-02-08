const db = require('../db-config');
class ParkingSlotController {
    async createParkingSlot(req, res) {
        const { vehicle_category, price, status } = req.body;
        const newSlot = await db.query(`insert into Parking_Slot (vehicle_category, price, status) values ($1, $2, $3)`,
            [vehicle_category, price, status]);
        res.json(newSlot);
    }
    async getParkingSlots(res) {
        const allSlots = await db.query(`select * from Parking_Slot`);
        res.json(allSlots);
    }
    // async createParkingSlot(req, res) {
    //     const { vehicle_category, price, status } = req.body;
    //     const newSlot = await db.query(`insert into Parking_Slot (vehicle_category, price, status) values ($1, $2)`,
    //         [vehicle_category, price, status]);
    //     res.json(newSlot);
    // }
    // async createParkingSlot(req, res) {
    //     const { vehicle_category, price, status } = req.body;
    //     const newSlot = await db.query(`insert into Parking_Slot (vehicle_category, price, status) values ($1, $2)`,
    //         [vehicle_category, price, status]);
    //     res.json(newSlot);
    // }
    // async createParkingSlot(req, res) {
    //     const { vehicle_category, price, status } = req.body;
    //     const newSlot = await db.query(`insert into Parking_Slot (vehicle_category, price, status) values ($1, $2)`,
    //         [vehicle_category, price, status]);
    //     res.json(newSlot);
    // }
}

module.exports = new ParkingSlotController();