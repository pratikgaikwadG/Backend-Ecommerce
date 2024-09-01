// const jwt = require("jsonwebtoken");

// exports.auth = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).send("Access denied. No token provided.");
//   }

//   const bearerword = token.split(" ")[0].trim();
//   const bearertoken = token.split(" ")[1];

//   if (bearerword !== "Bearer") {
//     return res.status(401).send("Access denied. Invalid token format.");
//   }

//   try {
//     const decoded = jwt.verify(bearertoken, "key");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).send("Invalid token.");
//   }
// };

// exports.admin = (req, res, next) => {
//   if (!req.user || !req.user.role) {
//     return res.status(403).send({ msg: "Access Denied! No user role found." });
//   }

//   if (req.user.role !== "admin") {
//     return res.status(403).send({ msg: "Access Denied! Admins only." });
//   }

//   next();
// };

const jwt = require('jsonwebtoken');

// Authentication Middleware
exports.auth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    const parts = token.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).send("Access denied. Invalid token format.");
    }

    const bearertoken = parts[1];

    try {
        const decoded = jwt.verify(bearertoken, "key"); // Ensure 'key' matches the secret used for signing
        req.user = decoded;  // Attaching decoded user data to request object
        next();
    } catch (error) {
        return res.status(401).send("Invalid token.");
    }
};

// Admin Authorization Middleware
exports.admin = (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(403).send({ msg: "Access Denied! No user role found." });
    }

    if (req.user.role !== "admin") {
        return res.status(403).send({ msg: "Access Denied! Admins only." });
    }

    next();
};
