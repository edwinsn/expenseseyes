const purchaseModel = require('../models/purchase')

const purchaseControllers = {}

purchaseControllers.getPurchases = async (req, res)=>{
    const {userId} = req.query
    let purchases = await purchaseModel.find({userId})
    res.json(purchases)
}

purchaseControllers.postPurchase = async (req, res)=>{
    const {userId, name, cathegory, price} = req.body
    console.log(userId&&cathegory?true:false)
    if(userId&&cathegory){
        const newPurchase = new purchaseModel({
            name,
            userId,
            cathegory,
            price
        })

        await newPurchase.save()
        res.json({message:"Purchase saved"})
    }else{
        res.json({message:"data incompleted"})
    }
}

purchaseControllers.deletePurchase = async (req, res)=>{
    const {id} = req.params
    await purchaseModel.findByIdAndDelete(id)
    res.json({message:"purchase deleted"})  
}
//add date
purchaseControllers.updatePurchase = async (req, res)=>{
    const {id, name, price, cathegory, date} = req.body
    await purchaseModel.updateOne({id}, { name, price, cathegory, date})
    res.json({message:"purchase updated"})
}

module.exports = purchaseControllers