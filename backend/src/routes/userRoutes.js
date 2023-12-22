const { Router } = require('express');
const router = Router();

const authController = require('./../controllers/authController');
const usersController = require('./../controllers/userController');

//////// USER ROUTER //////////////

//este diferit route pentru autentificare, poate fi numai post
router.post('/singup', authController.singup);
router.post('/login', authController.login);

router
  .route('/')
  // .get(authController.protect, usersController.getAllUsers)
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
