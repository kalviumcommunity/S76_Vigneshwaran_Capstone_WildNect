
const mongoose=require("mongoose")
const connection =()=>{mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDb connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to the MongoDB", err);
  });}
module.exports=connection