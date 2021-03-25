const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    name:{type:String, require:true},
    encryptedPassword:{type:String, require:true}
})

module.export = model("user", userSchema)