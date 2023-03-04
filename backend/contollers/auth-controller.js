const db = require("../db-config");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");

class AuthController {
  // signup
  async signUpUser(req, res) {
    const { username, password, full_name, phone_number } = req.body;
    let newUser;
    try {
      newUser = await db("connect_user").query(
        `insert into Users (username, password, full_name, phone_number) values ($1, $2, $3, $4)`,
        [username, password, full_name, phone_number]
      );
    } catch (err) {
      newUser = db("connect_user").query(`select reset_user_id_seq()`); // decrement user_id to fix serial sequence
      if (err.code == 23505) return res.status(409).json(err); // duplicate
      else return res.status(400).json(err); // bad request
    }
    res.status(201).json(newUser);
  }

  // signin
  async signInUser(req, res) {
    try {
      const { username, password } = req.body;
      const foundUser = await db("connect_user").query(
        `select category from Users where Users.username = $1 and Users.password = $2`,
        [username, sha256(password)]
      );
      if (!foundUser.rowCount) throw "no such user yet";
      // if select returned nothing then throw error
      const accessToken = jwt.sign(
        { username, role: foundUser.rows[0].category },
        process.env.ACCESS_TOKEN_SALT,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        { username, role: foundUser.rows[0].category },
        process.env.REFRESH_TOKEN_SALT,
        { expiresIn: "12h" }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 12 * 60 * 60 * 1000,
      });
      res.json({ accessToken, role: foundUser.rows[0].category });
    } catch (err) {
      console.log(err);
      return res.status(401).json(err); // unauthorized
    }
  }

  // signout
  signOutUser(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // no content
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  }

  // refreshtoken
  userRefreshToken(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SALT,
      async (err, decoded) => {
        let foundUser = await db(req.body.role).query(
          `select * from Users where Users.username = $1`,
          [decoded.username]
        );
        if (err || !foundUser?.rowCount) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { username: decoded.username, role: decoded.role },
          process.env.ACCESS_TOKEN_SALT,
          { expiresIn: "30s" }
        );
        res.json({
          accessToken,
          username: decoded.username,
          role: decoded.role,
        });
      }
    );
  }

  // guest needs it too
  async getParkingSlots(req, res) {
    const allSlots = await db("connect_user").query(
      `select * from Parking_Slot`
    );
    res.json(allSlots);
  }
}

module.exports = new AuthController();
