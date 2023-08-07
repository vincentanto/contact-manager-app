const asyncHandler = require("express-async-handler");
const Contact =require("../model/contactModels");
const getAllcontact = asyncHandler( async (req,res)=>{
    const contact = await Contact.find(); 
    res.status(200).json(contact);
})

const getContactById= asyncHandler( async(req,res)=>{
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("contact not found!!");
  }
    res.status(200).json(contact);
})


 const createContact = asyncHandler(async (req,res)=>{
    const {name,email,phone }= req.body;
    
    if(!name|| !email || !phone){
     res.status(400);
        throw new Error("all fields are mandatory");
    }
    const contact = await Contact.create({
        name,email,phone,
    })

    res.status(200).json({message:" contacts saved"});
})


 const updateContact = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
      res.status(404);
      throw new Error("contact not found!")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new : true
        }
    )
    res.status(200).json(updatedContact);
})

const deleteContact = asyncHandler( async (req,res)=>{
   
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
   await contact.deleteOne();

    res.status(200).json(contact);
})

 module.exports={getAllcontact,getContactById,createContact,updateContact,deleteContact};