const Router = require("express");
const router = new Router();
const BookingController = require("../contollers/booking-controller");

router.post("/booking", BookingController.createBooking);

router.get("/bookings", BookingController.getBookings);
router.get("/id/:id", BookingController.getBookingByID);
router.get("/username/:username", BookingController.getBookingsByUsername);

router.delete("/id/:id", BookingController.deleteBookingByID);

router.put("/id/:id", BookingController.putBookingByID);

module.exports = router;
