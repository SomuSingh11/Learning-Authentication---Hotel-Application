const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //Check request header has authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Invalid Token" });

  //Extract the token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify the JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

// Function to generate a JWT Token
const generateToken = (userData) => {
  // Generate a new JWT Token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3600 }); //expire in 1 hour
};

module.exports = { jwtAuthMiddleware, generateToken };
