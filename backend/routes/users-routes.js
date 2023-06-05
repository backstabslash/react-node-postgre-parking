const Router = require("express");
const router = new Router();
const UsersController = require("../contollers/users-controller");

router.get("/users", UsersController.getUsers);
router.get("/id/:id", UsersController.getUserByID);
router.get("/username/:username", UsersController.getUserByUsername);

router.delete("/id/:id", UsersController.deleteUserByID);
router.delete("/username/:username", UsersController.deleteUserByUsername);

router.put("/username/:username", UsersController.updateUserByUsername);

router.patch("/id/:id", UsersController.patchUserRoleByID); // or put?
router.patch("/username/:username", UsersController.patchUserRoleByUsername); // or put?

module.exports = router;
