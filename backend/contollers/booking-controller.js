const db = require("../db-config");

class BookingController {
  // post booking
  async createBooking(req, res) {
    const {
      vehicle_id,
      slot_id,
      start_date,
      end_date,
      status,
      amount_due,
      amount_paid,
      remarks,
    } = req.body;
    const newBooking = await db(req.body.role).query(
      `insert into Parking_Slot (vehicle_id, slot_id, start_date, end_date, status, amount_due, amount_paid, remarks) values ($1, $2, $3, $4, $5, $6, $7, $8)`,
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
    // add error handler with broken sequence fix
    res.json(newBooking);
  }

  // get all bookings
  async getBookings(req, res) {
    const allBookings = await db(req.body.role).query(
      `select * from booking_status order by booking_id`
    );
    res.json(allBookings);
  }

  async getBookingsByUsername(req, res) {
    const allBookings = await db(req.body.role).query(
      `select booking_id, b.vehicle_id, slot_id, start_date, end_date, status, amount_due, amount_paid, remarks from Booking b
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
      vehicle_id,
      slot_id,
      start_date,
      end_date,
      status,
      amount_due,
      amount_paid,
      remarks,
      booking_id,
    } = req.body;
    db(req.body.role).query(
      `update Booking set vehicle_id = $1, slot_id = $2, start_date = $3, end_date = $4, status = $5, amount_due = $6, amount_paid = $7, remarks = $8 where Booking.booking_id = $9`,
      [
        vehicle_id,
        slot_id,
        start_date,
        end_date,
        status,
        amount_due,
        amount_paid,
        remarks,
        booking_id,
      ]
    );
  }
}

module.exports = new BookingController();
