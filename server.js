const express = require("express");
const errorHandler = require("./errorHandler/errorHandler");
const connectDb = require("./config/connectdb");
const dotenv=require("dotenv").config();
const app = express();
connectDb();
const port = process.env.port || 5002;
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`server running on ${port}`)
});
console.log("hi")