require("dotenv").config({path:'./config/.env'});
const express = require("express");
const connection = require("./config/db");
const species =require("./Routes/Species");
const cors =require('cors')
const app = express();
app.use(cors())
app.use('/species',species)
connection();
const port =process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}` )
})