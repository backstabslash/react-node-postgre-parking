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
      if (err.code == 23505)
        return res.status(409).json({ error: `${err.detail}` });
      // duplicate
      else return res.status(400).json({ error: "bad request" }); // bad request
    }
    res.status(201).json(newUser);
  }

  // signin
  async signInUser(req, res) {
    try {
      const { username, password } = req.body;
      const foundUser = await db("connect_user").query(
        `select category, full_name, phone_number from Users where Users.username = $1 and Users.password = $2`,
        [username, sha256(password)]
      );
      if (!foundUser.rowCount) throw "no such user yet";
      // if select returned nothing then throw error
      const accessToken = jwt.sign(
        { username, role: foundUser.rows[0].category },
        process.env.ACCESS_TOKEN_SALT,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { username, role: foundUser.rows[0].category },
        process.env.REFRESH_TOKEN_SALT,
        { expiresIn: "24h" }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({
        accessToken,
        role: foundUser.rows[0].category,
        fullName: foundUser.rows[0].full_name,
        phoneNumber: foundUser.rows[0].phone_number,
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "invalid username or password" }); // unauthorized
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
          fullName: foundUser.rows[0].full_name,
          phoneNumber: foundUser.rows[0].phone_number,
        });
      }
    );
  }

  // guest slots
  async getParkingSlots(req, res) {
    const allSlots = await db("connect_user").query(
      `select * from slot_status order by slot_id`
    );
    res.json(allSlots);
  }

  // guest bookings
  async getBookings(req, res) {
    const allBookings = await db("connect_user").query(
      `select start_date, end_date, slot_id from booking_status where status = 'ongoing' or status = 'upcoming'`
    );
    res.json(allBookings);
  }

  // get slots depending on chosen date
  async getParkingSlotsByDate(req, res) {
    const dateSlots = await db().query(
      `select ps.slot_id, ps.vehicle_category, ps.price,
      coalesce(
        case when latest_booking.status in ('upcoming', 'ongoing')
          then 'occupied'
          else 'available'
        end, 'available'
      ) as status from parking_slot ps
      left join (
          select slot_id, status from booking_status
          where (slot_id, start_date) in (
            select slot_id, max(start_date) from booking_status
            where status <> 'canceled' group by slot_id
          )
        and end_date > $1) 
      latest_booking on ps.slot_id = latest_booking.slot_id;`,
      [req.params.date]
    );
    res.json(dateSlots);
  }
}

module.exports = new AuthController();
