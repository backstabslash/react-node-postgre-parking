const Router = require("express");
const router = new Router();
const DiscountController = require("../contollers/discount-controller");

router.post("/discount", DiscountController.createDiscount);

router.get("/discounts", DiscountController.getDiscounts);
router.get("/id/:id", DiscountController.getDiscountByID);
router.get("/username/:username", DiscountController.getDiscountsByUsername);

router.delete("/id/:id", DiscountController.deleteDiscountbyID);

router.put("/id/:id", DiscountController.putDiscountByID);

module.exports = router;
