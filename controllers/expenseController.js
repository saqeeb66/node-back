const expenseService = require("../services/expenseService");

/* ADD EXPENSE */

exports.addExpense = async (req, res) => {

  try {

    const driverUserId = req.user.userId;

    await expenseService.addExpense(
      req.body,
      driverUserId
    );

    res.json({ message: "Expense added" });

  } catch (err) {

    res.status(400).json({
      error: err.message
    });

  }

};


/* GET EXPENSES */

exports.getTripExpenses = async (req, res) => {

  try {

    const expenses =
      await expenseService.tripExpenses(req.params.tripId);

    res.json(expenses);

  } catch (err) {

    res.status(400).json({
      error: err.message
    });

  }

};