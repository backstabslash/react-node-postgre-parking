const db = require("../db-config");

class VehicleController {
  // post vehicle
  async createVehicle(req, res) {
    const { user_id, plate_number, brand, vehicle_category } = req.body;
    const newVehicle = await db(req.body.role).query(
      `insert into Vehicle (user_id, plate_number, brand, vehicle_category) values ($1, $2, $3, $4)`,
      [user_id, plate_number, brand, vehicle_category]
    );
    res.json(newVehicle);
  }

  // get all vehicles
  async getVehicles(req, res) {
    const allVehicles = await db(req.body.role).query(`select * from Vehicle`);
    res.json(allVehicles);
  }

  // get all vehicles by username
  async getVehiclesByUsername(req, res) {
    console.log(req.body.user, req.body.role);
    const allVehicles = await db(req.body.role).query(
      `select vehicle_id, vehicle_category, brand, plate_number from Vehicle v
       inner join Users u on v.user_id = u.user_id
       where u.username = $1`,
      [req.params.username]
    );
    res.json(allVehicles);
  }

  // get single vehicle by id
  async getVehicleByID(req, res) {
    const singleVehicle = await db(req.body.role).query(
      `select * from Vehicle where Vehicle.vehicle_id = $1`,
      [req.body.vehicle_id]
    );
    res.json(singleVehicle);
  }

  // delete vehicle by id
  async deleteVehicleByID(req, res) {
    db(req.body.role).query(
      `delete from Vehicle where Vehicle.vehicle_id = $1`,
      [req.body.vehicle_id]
    );
  }

  //update whole vehicle by id
  async putVehicleByID(req, res) {
    const { user_id, plate_number, brand, vehicle_category, vehicle_id } =
      req.body;
    db(req.body.role).query(
      `update Vehicle set user_id = $1, plate_number = $2, brand = $3, vehicle_category = $4 where Vehicle.vehicle_id = $5`,
      [user_id, plate_number, brand, vehicle_category, vehicle_id]
    );
  }
}

module.exports = new VehicleController();
