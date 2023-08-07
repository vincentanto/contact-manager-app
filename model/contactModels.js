const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name:{
        type : String,
        required :[true,"Enetr your contact name!"]
    },
    email:{
        type : String,
        required :[true,"Enetr your contact mail id!"]
    },
    phone :{
        type:String,
        required : [true,"Enter your contact's phonw number :)"]
    }
},
{
    timestamps : true,
})
 module.exports = mongoose.model("Contact",contactSchema);