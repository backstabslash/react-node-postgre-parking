const Router = require("express");
const router = new Router();
const BookingController = require("../contollers/booking-controller");

router.post("/booking", BookingController.createBooking);

router.get("/bookings", BookingController.getBookings);
router.get("/id/:id", BookingController.getBookingByID);
router.get("/username/:username", BookingController.getBookingsByUsername);
router.get(
  "/totalbookings/username/:username",
  BookingController.totalBookingsByUsername
);
router.get(
  "/totaltime/username/:username",
  BookingController.totalTimeByUsername
);
router.get(
  "/avgprice/username/:username",
  BookingController.avgPriceByUsername
);

router.delete("/id/:id", BookingController.deleteBookingByID);

router.put("/id/:id", BookingController.putBookingByID);

module.exports = router;
