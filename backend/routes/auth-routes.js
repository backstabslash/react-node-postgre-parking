const Router = require("express");
const router = new Router();
const AuthController = require("../contollers/auth-controller");

router.post("/sign_up", AuthController.signUpUser);
router.post("/sign_in", AuthController.signInUser);
router.get("/sign_out", AuthController.signOutUser);
router.get("/refresh", AuthController.userRefreshToken);
router.get("/slots", AuthController.getParkingSlots);
router.get("/bookings", AuthController.getBookings);
router.get("/slots/date/:date", AuthController.getParkingSlotsByDate);

module.exports = router;
