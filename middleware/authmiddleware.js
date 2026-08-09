const cookieparser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const path = require("path");

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {

        jwt.verify(
            token,
            process.env.SECRET_KEY,
            (err, decodedToken) => {

                if (err) {
                    console.log("Invalid token");
                    return res.redirect("/");
                }

                console.log(decodedToken);
                next();
            }
        );

    } else {

        console.log("No JWT token found");
        return res.redirect("/");
    }
};

module.exports = { requireAuth };