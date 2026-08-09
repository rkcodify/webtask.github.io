const { Router } = require("express");

const authcontrollers = require("../controllers/authcontrollers.js");

const router = Router();

router.get("/signup", authcontrollers.signup_get);

router.get("/signin", authcontrollers.signin_get);

router.post("/signup", authcontrollers.signup_post);

router.post("/signin", authcontrollers.signin_post);

router.post("/contact", authcontrollers.contact_post);

module.exports = router;