const express = require("express");
const { getAllcontact, createContact, updateContact, deleteContact, getContactById } = require("../controllers/mycontactControllers");
const router = express.Router();
 router.route("/").get(getAllcontact).post(createContact);
 router.route("/:id").get(getContactById).put(updateContact).delete(deleteContact);

module.exports=router;