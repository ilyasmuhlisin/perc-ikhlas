const jwt = require("jsonwebtoken");
const verifyIsLoggedIn = (req, res, next) => {
  // cek fetch api
  // next();
  // return;
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      // go to next middleware
      next();
    } catch (err) {
      return res.status(401).send("Unauthorized. Invalid Token");
    }
  } catch (err) {
    next(err);
  }
};

const verifyIsAdmin = (req, res, next) => {
  // cek fetch api
  // next();
  // return;
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send("Unauthorized. Admin required");
  }
};

module.exports = { verifyIsLoggedIn, verifyIsAdmin };
