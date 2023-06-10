const db = require("../db-config");

class BookingController {
  // post booking
  async createBooking(req, res) {
    const {
      vehicle_id,
      slot_id,
      start_date,
      end_date,
      status = "ongoing",
      amount_due,
      amount_paid = 0,
      remarks = "",
    } = req.body;
    const newBooking = await db(req.body.role).query(
      `insert into Booking (vehicle_id, slot_id, start_date, end_date, status, amount_due, amount_paid, remarks) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`,
      [
        vehicle_id,
        slot_id,
        start_date,
        end_date,
        status,
        amount_due,
        amount_paid,
        remarks,
      ]
    );
    res.json(newBooking);
  }

  // total bookings by username
  async totalBookingsByUsername(req, res) {
    const totalBookings = await db(req.body.role).query(
      `select count(*) as total_bookings from booking b
      inner join vehicle v on v.vehicle_id = b.vehicle_id
      inner join users u on u.user_id = v.user_id
      where u.username = $1 and b.status <> 'canceled'`,
      [req.params.username]
    );
    res.json(totalBookings);
  }

  // total time spent by username
  async totalTimeByUsername(req, res) {
    const totalTime = await db(req.body.role).query(
      `select sum(end_date - start_date) as parking_time
      from booking b
      inner join vehicle v on v.vehicle_id = b.vehicle_id
      inner join users u on u.user_id = v.user_id where u.username = $1`,
      [req.params.username]
    );
    res.json(totalTime);
  }

  // avg price by username
  async avgPriceByUsername(req, res) {
    const avgPrice = await db(req.body.role).query(
      `select sum(amount_due) / sum(end_date - start_date) as avg_cost_per_day
      from booking b
      inner join vehicle v on v.vehicle_id = b.vehicle_id
      inner join users u on u.user_id = v.user_id where u.username = $1;`,
      [req.params.username]
    );
    res.json(avgPrice);
  }

  // get all bookings
  async getBookings(req, res) {
    const allBookings = await db(req.body.role).query(
      `select * from booking_status order by booking_id`
    );
    res.json(allBookings);
  }

  // get bookings by username
  async getBookingsByUsername(req, res) {
    const allBookings = await db(req.body.role).query(
      `select booking_id, b.vehicle_id, slot_id, start_date, end_date, status, amount_due, amount_paid, remarks from booking_status b
       inner join Vehicle v on b.vehicle_id = v.vehicle_id
	     inner join Users u on v.user_id = u.user_id
       where u.username = $1`,
      [req.params.username]
    );
    res.json(allBookings);
  }

  // get single booking by id
  async getBookingByID(req, res) {
    const singleBooking = await db(req.body.role).query(
      `select * from Booking where Booking.booking_id = $1`,
      [req.body.booking_id]
    );
    res.json(singleBooking);
  }

  // delete booking by id
  async deleteBookingByID(req, res) {
    db(req.body.role).query(
      `delete from Booking where Booking.booking_id = $1`,
      [req.body.booking_id]
    );
  }

  // update whole booking by id
  async putBookingByID(req, res) {
    const {
      start_date,
      end_date,
      status,
      amount_due,
      amount_paid,
      remarks,
      booking_id,
    } = req.body;
    const updateBooking = await db(req.body.role).query(
      `update Booking set start_date = $1, end_date = $2, status = $3, amount_due = $4, amount_paid = $5, remarks = $6 where Booking.booking_id = $7 returning *`,
      [
        start_date,
        end_date,
        status,
        amount_due,
        amount_paid,
        remarks,
        booking_id,
      ]
    );
    res.json(updateBooking);
  }
}

module.exports = new BookingController();
