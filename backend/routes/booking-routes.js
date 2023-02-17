const Router = require("express");
const router = new Router();
const BookingController = require("../contollers/booking-controller");

router.post("/booking", BookingController.createBooking);

router.get("/bookings", BookingController.getBookings);
router.get("/booking/id/:id", BookingController.getBookingByID);

router.delete("/booking/id/:id", BookingController.deleteBookingByID);

router.put("/booking/id/:id", BookingController.putBookingByID);

module.exports = router;
