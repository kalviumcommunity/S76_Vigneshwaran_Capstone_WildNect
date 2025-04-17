require("dotenv").config({path:'./config/.env'});
const express = require("express");
const connection = require("./config/db");
const app = express();
connection();
const port =process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}` )
})