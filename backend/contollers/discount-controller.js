const db = require("../db-config");

class DiscountController {
  // post discount
  async createDiscount(req, res) {
    const { user_id, percentage, start_date, end_date } = req.body;
    const newDiscount = await db(req.body.role).query(
      `insert into Discount (user_id, percentage, start_date, end_date) values ($1, $2, $3, $4) returning *`,
      [user_id, percentage, start_date, end_date]
    );
    res.json(newDiscount);
  }

  // get all discounts
  async getDiscounts(req, res) {
    const allDiscounts = await db(req.body.role).query(
      `select * from Discount`
    );
    res.json(allDiscounts);
  }

  // get all discounts by username
  async getDiscountsByUsername(req, res) {
    const allDiscounts = await db(req.body.role).query(
      `select discount_id, start_date, end_date, percentage from discount d
      inner join users u on d.user_id = u.user_id where u.username = $1
      and (start_date <= now() and end_date >= now() or start_date <= now())
      order by start_date desc limit 1;`,
      [req.params.username]
    );
    res.json(allDiscounts);
  }

  // get single discount by id
  async getDiscountByID(req, res) {
    const singleDiscount = await db(req.body.role).query(
      `select * from Discount where Discount.discount_id = $1`,
      [req.body.discount_id]
    );
    res.json(singleDiscount);
  }

  // delete discount by id
  async deleteDiscountbyID(req, res) {
    const deletedBooking = await db(req.body.role).query(
      `delete from Discount where Discount.discount_id = $1 returning *`,
      [req.params.id]
    );
    res.json(deletedBooking);
  }

  // update whole discount by id
  async putDiscountByID(req, res) {
    const { percentage, start_date, end_date, discount_id } = req.body;
    db(req.body.role).query(
      `update Discount set percentage = $1, end_date = $2 where Discount.discount_id = $3 returning *`,
      [percentage, end_date, discount_id]
    );
  }
}

module.exports = new DiscountController();
