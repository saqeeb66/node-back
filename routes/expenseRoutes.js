const router = require("express").Router();
const auth = require("../middleware/jwtMiddleware");

const controller =
  require("../controllers/expenseController");


router.post(
  "/",
  auth,
  controller.addExpense
);


router.get(
  "/:tripId",
  auth,
  controller.getTripExpenses
);

module.exports = router;