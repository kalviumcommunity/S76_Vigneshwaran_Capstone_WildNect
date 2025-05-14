require("dotenv").config({path:'./config/.env'});
const express = require("express");
const connection = require("./config/db");
const species =require("./Routes/Species");
const auth =require("./Routes/Auth");
const cors =require('cors')
const app = express();
// Middleware
const session = require("express-session");
const MongoStore = require("connect-mongo");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies
  })
);
app.use(
  session({
    name: "connect.sid", // default cookie name
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
    cookie: {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "lax", // or "none" with secure: true for cross-site
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);  
app.use("/species",species)
app.use("/auth",auth)
connection();
const port =process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}` )
})