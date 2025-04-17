const mongoose = require("mongoose");
const connection = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDb connected successfully");
    })
    .catch((err) => {
      console.log("Error connecting to the MongoDB", err);
      setTimeout(connection,5000)
    });
};
module.exports = connection;
