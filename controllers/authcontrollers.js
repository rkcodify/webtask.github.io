const path = require("path");
const databaseschema = require("../models/databaseschema.js");
const contactschema = require("../models/contactschema.js");
const jwt = require("jsonwebtoken");

// Handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);

    let errors = {
        email: "",
        password: ""
    };

    // Incorrect email
    if (err.message === "Incorrect Email") {
        errors.email = "incorrect email";
    }

    // Incorrect password
    if (err.message === "Incorrect Password") {
        errors.password = "incorrect password";
    }

    // Duplicate email
    if (err.code === 11000) {
        errors.email = "that email is already registered";
        return errors;
    }

    // Validation error
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });

        return errors;
    }

    return errors;
};


// JWT expiration
const maxAge = 3 * 24 * 60 * 60;


// Create JWT
const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.SECRET_KEY,
        {
            expiresIn: maxAge
        }
    );
};


// =========================
// SIGNUP GET
// =========================

module.exports.signup_get = (req, res) => {
    res.setHeader("Content-Type", "text/html");

    res.sendFile(
        path.join(
            __dirname,
            "../views/signuppage/signup.html"
        )
    );
};


// =========================
// SIGNUP POST
// =========================

module.exports.signup_post = async (req, res) => {

    res.setHeader("Content-Type", "application/json");

    const {
        username,
        email,
        telephone,
        age,
        gender,
        password,
        confirmpassword
    } = req.body;


    // Check passwords
    if (password !== confirmpassword) {
        return res.status(400).json({
            errors: {
                password: "Passwords do not match"
            }
        });
    }


    try {

        const signup = await databaseschema.create({
            username,
            email,
            telephone,
            age,
            gender,
            password
        });


        // Create JWT
        const token = createToken(signup._id);


        // Store JWT in cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });


        res.status(201).json({
            user: signup._id
        });


    } catch (err) {

        const errors = handleErrors(err);

        res.status(400).json({
            errors
        });
    }
};


// =========================
// SIGNIN GET
// =========================

module.exports.signin_get = (req, res) => {

    res.setHeader("Content-Type", "text/html");

    res.sendFile(
        path.join(
            __dirname,
            "../views/signinpage/signin.html"
        )
    );
};


// =========================
// SIGNIN POST
// =========================

module.exports.signin_post = async (req, res) => {

    const {
        email,
        password
    } = req.body;


    try {

        const user = await databaseschema.login(
            email,
            password
        );


        // Create JWT
        const token = createToken(user._id);


        // Store JWT
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });


        res.status(200).json({
            user: user.email
        });


    } catch (err) {

        const errors = handleErrors(err);

        res.status(400).json({
            errors
        });
    }
};


// =========================
// CONTACT POST
// =========================

module.exports.contact_post = async (req, res) => {

    try {

        const contactdata = req.body;

        await contactschema.create(contactdata);


        res.status(201).json({
            message: "Thank you for contacting us"
        });


    } catch (err) {

        console.log(err);

        res.status(400).json({
            errors: err.message
        });
    }
};