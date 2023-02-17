var jwt = require("jsonwebtoken");
var { createError } = require("./error.js");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    // return next(createError(401, "You are not authenticated!"));
    return res.status(401).send("Bạn không được xác thực!")
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) 
      // return next(createError(403, "Token is not valid!"));
      return res.status(403).send("Xác thực không thành công!");
    console.log(user); 
    req.user = user;
    next();
  });
};

// Use when Update user
const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err) 
        // return next(createError(403, "You are not AUTHORIZED!"));
        return res.status(403).send("Bạn không được phân quyền!")
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      if (err) return res.status(403).send("Bạn không được phân quyền!")
    }
  });
};

module.exports = { verifyAdmin, verifyToken, verifyUser };
