const Router = require('express');
const router = new Router();
const UsersController = require('../contollers/users-controller');

router.post('/sign_up', UsersController.createUser);
router.post('/sign_in', UsersController.logUser);

router.get('/users', UsersController.getUsers);
router.get('/user/id/:id', UsersController.getUserByID);
router.get('/user/username/:username', UsersController.getUserByUsername);

router.delete('/user/id/:id', UsersController.deleteUserByID);
router.delete('/user/username/:username', UsersController.deleteUserByUsername);

router.patch('/user/id/:id', UsersController.patchUserRoleByID); // or put?
router.patch('/user/username/:username', UsersController.patchUserRoleByUsername); // or put?

module.exports = router;