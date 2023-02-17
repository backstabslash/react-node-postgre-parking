const db = require("../db-config");

class UsersController {
  // get all users
  async getUsers(req, res) {
    const allUsers = await db().query(`select * from Users`);
    res.json(allUsers);
  }

  // get single user by id
  async getUserByID(req, res) {
    const singleUser = await db().query(
      `select * from Users where Users.user_id = $1`,
      [req.body.user_id]
    );
    res.json(singleUser);
  }

  // get single user by username
  async getUserByUsername(req, res) {
    const singleUser = await db().query(
      `select * from Users where Users.username = $1`,
      [req.body.username]
    );
    res.json(singleUser);
  }

  // delete user by id
  async deleteUserByID(req, res) {
    db().query(`delete from Users where Users.user_id = $1`, [
      req.body.user_id,
    ]);
  }

  // delete user by username
  async deleteUserByUsername(req, res) {
    db().query(`delete from Users where Users.username = $1`, [
      req.body.username,
    ]);
  }

  // update user role by id
  async patchUserRoleByID(req, res) {
    db().query(`update Users set category = $1 where Users.user_id = $2`, [
      req.body.category,
      req.body.user_id,
    ]);
  }

  // update user role by username
  async patchUserRoleByUsername(req, res) {
    db().query(`update Users set category = $1 where Users.username = $2`, [
      req.body.category,
      req.body.username,
    ]);
  }
}

module.exports = new UsersController();
