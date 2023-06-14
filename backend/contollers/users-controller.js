const db = require("../db-config");
const sha256 = require("sha256");

class UsersController {
  // post user
  async postUser(req, res) {
    const { username, password, full_name, phone_number } = req.body;
    try {
      const newUser = await db("connect_user").query(
        `insert into Users (username, password, full_name, phone_number) values ($1, $2, $3, $4) returning *`,
        [username, password, full_name, phone_number]
      );
      res.status(201).json(newUser);
    } catch (err) {
      if (err.code == 23505)
        return res.status(409).json({ error: `${err.detail}` });
      // duplicate
      else return res.status(400).json({ error: "bad request" }); // bad request
    }
  }

  // get all users
  async getUsers(req, res) {
    const allUsers = await db(req.body.role).query(`select * from Users`);
    res.json(allUsers);
  }

  // get single user by id
  async getUserByID(req, res) {
    const singleUser = await db(req.body.role).query(
      `select * from Users where Users.user_id = $1`,
      [req.body.user_id]
    );
    res.json(singleUser);
  }

  // get single user by username
  async getUserByUsername(req, res) {
    const singleUser = await db(req.body.role).query(
      `select * from Users where Users.username = $1`,
      [req.body.username]
    );
    res.json(singleUser);
  }

  // delete user by id
  async deleteUserByID(req, res) {
    const response = await db(req.body.role).query(
      `with deleted_bookings as (
      delete from booking where vehicle_id in (
      select vehicle_id from vehicle where user_id = $1
      ) returning *
      ), deleted_discounts as (
      delete from discount where user_id = $1
      returning *
      ),
      deleted_vehicles as (
      delete from vehicle where user_id = $1
      returning *
      )
      delete from users
      where user_id = $1 returning *;`,
      [req.params.id]
    );
    res.json(response);
  }

  // delete user by username
  async deleteUserByUsername(req, res) {
    db(req.body.role).query(`delete from Users where Users.username = $1`, [
      req.body.username,
    ]);
  }

  // update user by username
  async updateUserByUsername(req, res) {
    const { username, new_username, full_name, phone_number, password } =
      req.body;
    let { new_password } = req.body;
    if (new_password === "") new_password = password;
    const updated = await db(req.body.role).query(
      `update Users set username = $1, full_name = $2, phone_number = $3, password = $4 where username = $5 and password = $6 
      returning username, full_name, phone_number`,
      [
        new_username,
        full_name,
        phone_number,
        new_password,
        username,
        sha256(password),
      ]
    );
    res.json(updated);
  }

  // update user by id (for admin)
  async updateUserById(req, res) {
    const { full_name, phone_number, new_password, category, user_id } =
      req.body;
    const updated = await db(req.body.role).query(
      `update Users set full_name = $1, phone_number = $2, password = $3, category = $4 where user_id = $5
      returning *`,
      [full_name, phone_number, new_password, category, user_id]
    );
    res.json(updated);
  }

  // update user role by id
  async patchUserRoleByID(req, res) {
    db(req.body.role).query(
      `update Users set category = $1 where Users.user_id = $2`,
      [req.body.category, req.body.user_id]
    );
  }

  // update user role by username
  async patchUserRoleByUsername(req, res) {
    db(req.body.role).query(
      `update Users set category = $1 where Users.username = $2`,
      [req.body.category, req.body.username]
    );
  }
}

module.exports = new UsersController();
