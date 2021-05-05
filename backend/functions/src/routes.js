const {Router} = require("express");
const {getPurchases,
  postPurchase,
  deletePurchase,
  updatePurchase} = require("./controllers/purchaseControllers");
const {checkUser, createUser} = require("./controllers/userControllers");

const router = Router();

router.route("/").get(getPurchases)
    .post(postPurchase)
    .put(updatePurchase);

router.route("/:id").delete(deletePurchase);

router.route("/user").get(checkUser)
    .post(createUser);

module.exports = router;
