const { Router } = require("express");
const {
  getPurchases,
  postPurchase,
  deletePurchase,
  updatePurchase,
} = require("./controllers/purchaseControllers");
const {
  getBudgets,
  postBudget,
  updateBudget,
  deleteBudget,
} = require("./controllers/budgetControllers");
const { checkUser, createUser } = require("./controllers/userControllers");

const router = Router();

router
  .route("/purchases")
  .get(getPurchases)
  .post(postPurchase)
  .put(updatePurchase);

router.route("/purchases/:id").delete(deletePurchase);

router.route("/budget").get(getBudgets).post(postBudget).put(updateBudget);
router.route("/budget/:id").delete(deleteBudget);

router.route("/user").get(checkUser).post(createUser);

module.exports = router;
