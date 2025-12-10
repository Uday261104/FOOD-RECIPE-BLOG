const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"]; // ✅ header keys are lowercase

  if (token) {
    token = token.split(" ")[1]; // removes "Bearer"

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      } else {
        req.user = decoded; // attach decoded payload to req
        next(); // ✅ must call next() to continue to the next middleware/route
      }
    });
  } else {
    return res.status(400).json({ message: "Token not provided" });
  }
};

module.exports = verifyToken;
