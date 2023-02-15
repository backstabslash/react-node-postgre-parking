const db = require('../db-config');
const sha256 = require('sha256');
const jwt = require('jwt-then');

class UsersController {
    // signup (post user)
    async createUser(req, res) {
        const { username, password, full_name, phone_number } = req.body;
        let newUser;
        try {
            newUser = await db().query(`insert into Users (username, password, full_name, phone_number) values ($1, $2, $3, $4)`, [username, password, full_name, phone_number]);
        }
        catch (err) {
            newUser = db.query(`select reset_user_id_seq()`); // decrement user_id to fix serial sequence
            if (err.code == 23505) return res.status(409).json(err); // duplicate
            else return res.status(400).json(err); // bad request
        }
        res.json(newUser);
    }

    // signin
    async logUser(req, res) {
        let token, newUser;
        try {
            const { username, password } = req.body;
            newUser = await db().query(`select * from Users where Users.username = $1 and Users.password = $2`, [username, sha256(password)]);
            token = await jwt.sign({ username }, process.env.SALT); // access token generation
            if (!newUser.rowCount) throw "no such user yet"; // if select returned nothing then throw error
        }
        catch (err) {
            return res.status(401).json(err); // unauthorized
        }
        res.json({ token, role: newUser.rows[0].category });
    }

    // get all users
    async getUsers(req, res) {
        const allUsers = await db().query(`select * from Users`);
        res.json(allUsers);
    }

    // get single user by id
    async getUserByID(req, res) {
        const singleUser = await db().query(`select * from Users where Users.user_id = $1`, [req.body.user_id]);
        res.json(singleUser);
    }

    // get single user by username
    async getUserByUsername(req, res) {
        const singleUser = await db().query(`select * from Users where Users.username = $1`, [req.body.username]);
        res.json(singleUser);
    }

    // delete user by id
    async deleteUserByID(req, res) {
        db().query(`delete from Users where Users.user_id = $1`, [req.body.user_id]);
    }

    // delete user by username
    async deleteUserByUsername(req, res) {
        db().query(`delete from Users where Users.username = $1`, [req.body.username]);
    }

    // update user role by id
    async patchUserRoleByID(req, res) {
        db().query(`update Users set category = $1 where Users.user_id = $2`, [req.body.category, req.body.user_id]);
    }

    // update user role by username
    async patchUserRoleByUsername(req, res) {
        db().query(`update Users set category = $1 where Users.username = $2`, [req.body.category, req.body.username]);
    }
}

module.exports = new UsersController();