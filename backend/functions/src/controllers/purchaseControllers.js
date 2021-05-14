const PurchaseModel = require("../models/purchase");

const purchaseControllers = {};

purchaseControllers.getPurchases = async (req, res)=>{
  const {userId} = req.query;
  const purchases = await PurchaseModel.find({userId});
  res.json(purchases);
};

purchaseControllers.postPurchase = async (req, res)=>{
  const {userId, name, category, price, date} = req.body;

  if (userId&&price) {
    const newPurchase = new PurchaseModel({
      name,
      userId,
      category,
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

purchaseControllers.updatePurchase = async (req, res)=>{
  const {id, name, price, category, date} = req.body;
  console.log({id, name, price, category, date} )
  let data=await PurchaseModel.updateOne({_id:id}, {name, price, category, date});
  res.json({message:data.nModified});
};

module.exports = purchaseControllers;