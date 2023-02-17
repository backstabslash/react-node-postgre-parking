const db = require("../db-config");

class VehicleController {
  // post vehicle
  async createVehicle(req, res) {
    const { user_id, plate_number, brand, vehicle_category } = req.body;
    const newVehicle = await db().query(
      `insert into Vehicle (user_id, plate_number, brand, vehicle_category) values ($1, $2, $3, $4)`,
      [user_id, plate_number, brand, vehicle_category]
    );
    res.json(newVehicle);
  }

  // get all vehicles
  async getVehicles(req, res) {
    const allVehicles = await db().query(`select * from Vehicle`);
    res.json(allVehicles);
  }

  // get single vehicle by id
  async getVehicleByID(req, res) {
    const singleVehicle = await db().query(
      `select * from Vehicle where Vehicle.vehicle_id = $1`,
      [req.body.vehicle_id]
    );
    res.json(singleVehicle);
  }

  // delete vehicle by id
  async deleteVehicleByID(req, res) {
    db().query(`delete from Vehicle where Vehicle.vehicle_id = $1`, [
      req.body.vehicle_id,
    ]);
  }

  //update whole vehicle by id
  async putVehicleByID(req, res) {
    const { user_id, plate_number, brand, vehicle_category, vehicle_id } =
      req.body;
    db().query(
      `update Vehicle set user_id = $1, plate_number = $2, brand = $3, vehicle_category = $4 where Vehicle.vehicle_id = $5`,
      [user_id, plate_number, brand, vehicle_category, vehicle_id]
    );
  }
}

module.exports = new VehicleController();
