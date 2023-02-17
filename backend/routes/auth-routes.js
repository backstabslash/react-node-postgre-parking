const Router = require("express");
const router = new Router();
const AuthController = require("../contollers/auth-controller");

router.get("/users", AuthController.getUsers);
router.post("/sign_up", AuthController.signUpUser);
router.post("/sign_in", AuthController.signInUser);
router.get("/sign_out", AuthController.signOutUser);
router.get("/refresh", AuthController.userRefreshToken);

module.exports = router;
