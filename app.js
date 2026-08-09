const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const authroutes = require("./routes/authroutes")
const cookieparser = require("cookie-parser");
const { requireAuth } = require("./middleware/authmiddleware");
const databaseschema = require("./models/databaseschema.js");
const jwt = require('jsonwebtoken');
require('dotenv').config();
process.env.SECRET_KEY;

const app = express();
const port = 5500;

// middleware
app.use(cors());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());// parse application/json
app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//making database rk
// mongoose.connect("mongodb://127.0.0.1:27017/rk", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }); 
mongoose.connect("mongodb+srv://xxrama_db_user:piGZq5v6gRaYhyqv@cluster0.gfkv8gk.mongodb.net/?appName=Cluster0",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
}).then(()=>{
  console.log("connected to mongodb atlas")
}); 

var db = mongoose.connection;

const homepage = fs.readFileSync("./views/homepage/index.html")
const aboutpage = fs.readFileSync("./views/aboutpage/about.html");
const contactpage = fs.readFileSync("./views/contactpage/contact.html");
const content = fs.readFileSync("./views/contentpage/content.html");
const signin = fs.readFileSync("./views/signinpage/signin.html");

app.post("/", (req, res, next) => {
  // // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,set-cookie');
  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  const token = req.cookies.jwt;
  console.log(token);
  //check token exist or not
  if(token){
    console.log(token);
    jwt.verify(token,process.env.SECRET_KEY,async(err, decodedToken)=>{
      if(err){
        console.log(err.message)
        res.locals.user = null;
        next();
      }
      else{
          let user = await databaseschema.findById(decodedToken.id);
          res.locals.user = JSON.stringify(user);
          res.json({"user":user.email});
      }
    })
  }
  else{
   res.locals.user=null;
   res.json({"error":"error"});
   next();
  }
});

app.get("/",(req,res)=>{
  res.setHeader("Content-Type", "text/html");
  res.send(homepage);
}
)
app.get("/about", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(aboutpage);
});

app.get("/contact", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(contactpage);
});

//getting router file to get and post request in server
app.use(authroutes);

// to access our content user must has to be logged in
app.get("/content",(req, res) => {
  res.setHeader("Content-Type","text/html");

  const token = req.cookies.jwt;
  //check token exist or not
  if(token){
    jwt.verify(token,process.env.SECRET_KEY,(err, decodedToken)=>{
      if(err){
        res.send(signin);
      }
      else{
          res.send(content);
      }
    })
  }
  else{
    res.send(signin);
  }

});

app.get("/logout", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  const token = req.cookies.jwt;
  //check token exist or not
  if(token){
    jwt.verify(token,process.env.SECRET_KEY,async(err, decodedToken)=>{
      if(err){
        console.log(err.message)
        next();
      }
      else{
          res.clearCookie("jwt");
          res.send(homepage);
          next();
      }
    })
  }
  else{
   res.send(homepage);
   next();
  }
});

app.listen(port, () => {
  console.log(`app executed successfully || Port ${port}`);
});
