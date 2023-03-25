var jwt = require("jsonwebtoken");
var { createError } = require("./error.js");
require("dotenv").config();

let refreshTokens = [];

const assignNewRefreshTokens = (array) => {
  refreshTokens = array;
}

const verifyToken = (req, res, next) => {
  // console.log(req.cookies);
  // const token = req.cookies.access_token;
  const authHeader = req.headers.authorization;
console.log("verify token");
  if (!authHeader) {
    // return next(createError(401, "You are not authenticated!"));
    return res.status(401).send("Bạn không được xác thực!");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
    if (err)
      // return next(createError(403, "Token is not valid!"));
      return res.status(403).send("Xác thực không thành công!");

    // console.log(user);
    req.user = user;
    next();
  });
};

// Use when Update user
const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // update, delete often has params.id
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err)
        // return next(createError(403, "You are not AUTHORIZED!"));
        return res.status(403).send("Bạn không được phân quyền!");
    }
  });
};

const verifyDoctor = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === "doctor") {
      next();
    } else {
      if (err) return res.status(403).send("Bạn không được phân quyền!");
    }
  });
};

const verifyCustomer = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === "customer") {
      next();
    } else {
      if (err) return res.status(403).send("Bạn không được phân quyền!");
    }
  });
};

const verifyAdmin = (req, res, next) => {
// console.log(req.user.role);
  verifyToken(req, res, next, () => {
    if (req.user.role === "admin") {
      console.log("admin verify");
      next();
    } else {
      console.log('<error></error>');
      if (err) return res.status(403).send("Bạn không được phân quyền!");
    }
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "30s",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_KEY
  );
};

module.exports = {
  verifyAdmin,
  verifyToken,
  verifyUser,
  generateAccessToken,
  generateRefreshToken,
  refreshTokens,
  assignNewRefreshTokens
};
