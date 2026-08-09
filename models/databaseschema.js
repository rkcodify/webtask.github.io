const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

//schema for signup page
const signupschema = new mongoose.Schema(
  {
    username: {
      type:String,
    },
    email: {
      type:String,
      required: [true,"please enter an Email"],
      unique: true,
      lowercase: true,
      validate : [isEmail,"Please enter an valid Email"] 
    },
    telephone:{
      type: String,
    },
    age:{
      type: Number,
    },
    gender: {
      type: String,
    },
    password:{
      type:String,
      required: [true,"please enter a strong password"],
      minLength: [6,"minimum length of a password is 6 character"]
    },
    updated:{
      type: Date, default: Date.now 
    },  
});

//creating a function for login form so that we can call it from signin authorisation
signupschema.statics.login = async function(email, password) {
    const user = await this.findOne({
        email: email.toLowerCase()
    });

    if (!user) {
        throw Error("Incorrect Email");
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
        throw Error("Incorrect Password");
    }

    return user;
};

//fire before adding collection to the database mainly used in password hashing
signupschema.pre('save',async function (next) {    //this is moongoose hooks 
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt) //this refers to the instance of collections schema here it is signupschema
  next();
})

const signupcollection = mongoose.model("signup", signupschema); //making collection with name signup in database rk

module.exports = signupcollection;
