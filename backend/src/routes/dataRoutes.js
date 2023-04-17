const { Router } = require('express');
const router = Router();

const authController = require('./../controllers/authController');
const dataController = require('./../controllers/dataController');

//////// USER ROUTER //////////////
router
  .route('/')
  .get(authController.protect, dataController.getAllData)
  .post(dataController.createData);

router
  .route('/:id')
  .get(dataController.getData)
  .patch(dataController.updateData)
  .delete(dataController.deleteData);

module.exports = router;
