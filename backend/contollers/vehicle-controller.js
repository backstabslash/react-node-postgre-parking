const db = require("../db-config");

class VehicleController {
  // post vehicle
  async createVehicle(req, res) {
    const { username, plate_number, brand, vehicle_category } = req.body;
    const newVehicle = await db(req.body.role).query(
      `insert into Vehicle (user_id, plate_number, brand, vehicle_category) values ((select user_id from Users where username = $1), $2, $3, $4) returning vehicle_id, user_id, plate_number, brand, vehicle_category`,
      [username, plate_number, brand, vehicle_category]
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
    const vehicleId = req.params.id;
    const deletedId = await db(req.body.role).query(
      `delete from Vehicle where Vehicle.vehicle_id = $1 returning vehicle_id`,
      [vehicleId]
    );
    res.json(deletedId);
  }

  // update whole vehicle by id
  async putVehicleByID(req, res) {
    const { plate_number, brand, vehicle_category, vehicle_id } = req.body;
    try {
      const singleVehicle = await db(req.body.role).query(
        "update Vehicle set plate_number = $1, brand = $2, vehicle_category = $3 where vehicle_id = $4 returning *",
        [plate_number, brand, vehicle_category, vehicle_id]
      );
      res.json(singleVehicle);
    } catch (err) {
      res.status(500).json({ error: "Failed to update vehicle." });
    }
  }
}

module.exports = new VehicleController();
