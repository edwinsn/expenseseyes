const BudgetModel = require("../models/budget");

const budgetControllers = {};

budgetControllers.getBudgets = async (req, res) => {
  const { userId } = req.query;
  const budgets = await BudgetModel.find({ userId });
  res.json(budgets);
};

budgetControllers.postBudget = async (req, res) => {
  const { userId, category, expected = 0, date } = req.body;

  if (userId && category) {
    const newBudget = new BudgetModel({
      userId,
      category,
      expected,
      date,
    });

    const resp = await newBudget.save();

    res.json({ message: "Budget saved", budget: resp });
  } else {
    res.json({ message: "Data incompleted" });
  }
};

budgetControllers.deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    await BudgetModel.findByIdAndDelete(id);
  } catch (e) {
    res.status(500).json({ message: "Error deleting budget" });
  }
  res.json({ message: "Budget deleted" });
};

budgetControllers.updateBudget = async (req, res) => {
  const { id, category, expected, date } = req.body;
  let data = await BudgetModel.updateOne(
    { _id: id },
    { expected, category, date }
  );
  res.json({ message: data.nModified });
};

module.exports = budgetControllers;
