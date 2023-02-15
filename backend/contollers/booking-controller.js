const db = require('../db-config');

class BookingController {
    // post booking
    async createBooking(req, res) {
        const { vehicle_id, slot_id, start_date, end_date, status, amount_due, amount_paid, remarks } = req.body;
        const newBooking = await db().query(`insert into Parking_Slot (vehicle_id, slot_id, start_date, end_date, status, amount_due, amount_paid, remarks) values ($1, $2, $3, $4, $5, $6, $7, $8)`, [vehicle_id, slot_id, start_date, end_date, status, amount_due, amount_paid, remarks]);
        // add error handler with broken sequence fix
        res.json(newBooking);
    }

    // get all bookings
    async getBookings(req, res) {
        const allBookings = await db().query(`select * from Booking`);
        res.json(allBookings);
    }

    // get single booking by id
    async getBookingByID(req, res) {
        const singleBooking = await db().query(`select * from Booking where Booking.booking_id = $1`, [req.body.booking_id]);
        res.json(singleBooking);
    }

    // delete booking by id
    async deleteBookingByID(req, res) {
        db().query(`delete from Booking where Booking.booking_id = $1`, [req.body.booking_id]);
    }

    // update whole booking by id
    async putBookingByID(req, res) {
        const { vehicle_id, slot_id, start_date, end_date, status, amount_due, amount_paid, remarks, booking_id } = req.body;
        db().query(`update Booking set vehicle_id = $1, slot_id = $2, start_date = $3, end_date = $4, status = $5, amount_due = $6, amount_paid = $7, remarks = $8 where Booking.booking_id = $9`, [vehicle_id, slot_id, start_date, end_date, status, amount_due, amount_paid, remarks, booking_id]);
    }
}

module.exports = new BookingController();