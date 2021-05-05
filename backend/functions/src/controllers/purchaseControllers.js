const PurchaseModel = require("../models/purchase");

const purchaseControllers = {};

purchaseControllers.getPurchases = async (req, res)=>{
  console.log("in get...")
  const {userId} = req.query;
  const purchases = await PurchaseModel.find({userId});
  res.json(purchases);
};

purchaseControllers.postPurchase = async (req, res)=>{
  const {userId, name, cathegory, price, date} = req.body;

  if (userId&&price) {
    const newPurchase = new PurchaseModel({
      name,
      userId,
      cathegory,
      price,
      date,
    });

    await newPurchase.save();
    res.json({message: "Purchase saved"});
  } else {
    res.json({message: "data incompleted"});
  }
};

purchaseControllers.deletePurchase = async (req, res)=>{

  console.log("deleteing...")
  const {id} = req.params;
  await PurchaseModel.findByIdAndDelete(id);
  res.json({message: "purchase deleted"});
};
// add date
purchaseControllers.updatePurchase = async (req, res)=>{
  const {id, name, price, cathegory, date} = req.body;
  await PurchaseModel.updateOne({id}, {name, price, cathegory, date});
  res.json({message: "purchase updated"});
};

module.exports = purchaseControllers;
