const Router = require('express');
const router = new Router();
const DiscountController = require('../contollers/discount-controller');

router.post('/discount', DiscountController.createDiscount);

router.get('/discounts', DiscountController.getDiscounts);
router.get('/discount/id/:id', DiscountController.getDiscountByID);

router.delete('/discount/id/:id', DiscountController.deleteDiscountbyID);

router.put('/discount/id/:id', DiscountController.putDiscountByID);

module.exports = router;