require("dotenv").config({path:'./config/.env'});
const express = require("express");
const connection = require("./config/db");
const species =require("./Routes/Species");
const auth =require("./Routes/Auth");
const cors =require('cors')
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies
  })
);
 
app.use("/species",species)
app.use("/auth",auth)
connection();
const port =process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}` )
})