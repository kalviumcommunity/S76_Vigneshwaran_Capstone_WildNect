const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "yourSuperSecretKey";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ msg: "No token, not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = verifyToken;
