const db = require("../db-config");
const sha256 = require("sha256");

class UsersController {
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
    db(req.body.role).query(`delete from Users where Users.user_id = $1`, [
      req.body.user_id,
    ]);
  }

  // delete user by username
  async deleteUserByUsername(req, res) {
    db(req.body.role).query(`delete from Users where Users.username = $1`, [
      req.body.username,
    ]);
  }

  // update user by username
  async updateUserByUsername(req, res) {
    const {
      username,
      new_username,
      full_name,
      phone_number,
      password,
      new_password,
    } = req.body;

    if (new_password === "") new_password = password;
    console.log(
      username,
      new_username,
      full_name,
      phone_number,
      password,
      new_password
    );
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
    console.log(updated);
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
