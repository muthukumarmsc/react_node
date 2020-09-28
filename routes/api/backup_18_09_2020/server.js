const express       = require('express');
const path          = require('path');
const mongoose      = require('mongoose');
const {ObjectId}    = require('mongodb');
var   ObjectID        = require('mongodb').ObjectID;
const bcrypt         = require("bcryptjs");
const async          = require("async");
const bodyParser      = require('body-parser');
const passport        = require('passport');
var   http            = require("http");
var   https           = require("https");
const helmet = require('helmet')
const rateLimit     = require("express-rate-limit");
const users         = require('./routes/api/users');
const Region = require("./models/Region");
const Supermerchant = require("./models/Supermerchant");
const NewAdvertisement = require("./models/Advertisement.js");
const City = require("./models/City");
var datetime = require('node-datetime');
const multer = require("multer");
const exchangePrices              = require('./models/exchangePrices');
require('./config/passport')(passport);
const app = express();
const cors = require('cors');
var mysql = require('mysql');
app.use(cors());
// var socket = require('socket.io');
var ip = require('ip');
var fs = require('fs');
var myip = ip.address();

console.log(myip,'ip');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(helmet())
//app.listen(9000);
var config = require('./config/config.js');
var connection = mysql.createConnection(config.databaseOptions);
if(connection){
  console.log("Sql Connected!");
}else{

  console.log("Sql failed!");
}

app.use(passport.initialize());
// app.use(express.static('public'));
var uploadsDir = './public/';
app.use(express.static(path.join(__dirname, uploadsDir)));
const apiLimiter = rateLimit({
  windowMs: 1000, // 15 minutes
  max: 15
});

app.use('/api', users);
app.get('/users', function (req, res) {
    res.json({status:true});
});

app.post('/checkusers',function(req,res){
   const  account=req.body.account;
    const  businessPhoneNumber1=req.body.businessPhoneNumber;
      connection.query('SELECT * FROM users WHERE business_phone_no = ?',[businessPhoneNumber1], function (error, results, fields) {
      if (results[0]) {
        console.log(results[0])
       return res.status(400).json({status:false,message: "Business phone number already exists as "+results[0].account,data:[] });
    } else {
      return res.status(200).json({status:true,message: "Register successfully",data:[] });
  }
    });

});

app.post('/users',function(req,res){
  var MPIN = Math.floor(1000 + Math.random() * 9000);
  // var today = new Date();
  var dt = datetime.create();
  var today = dt.format('m/d/Y H:M:S');
  const passwordhash=req.body.password;
  const business_phone_no= req.body.businessPhoneNumber;
  const userName= req.body.userName;
  const  password= req.body.password;
  const  businessPhoneNumber=req.body.businessPhoneNumber;
  const  email=req.body.email;
  const  mobileMoneyPhoneNumber= req.body.mobileMoneyPhoneNumber;
  const  personalPhoneNumber= req.body.personalPhoneNumber;
  const  superMerchant= req.body.superMerchant;
  const  agencyName=req.body.agencyName;
  const  address= req.body.address;
  const  mapAddress= req.body.mapAddress;
  const  city= req.body.city;
  const  region= req.body.region;
  const  country= req.body.country;
  const  account= req.body.account;
  const  amount=req.body.amount;
  const  mpin=req.body.mpin;
  const  active=1;
    connection.query('SELECT * FROM users WHERE business_phone_no = ?',[business_phone_no], function (error, results, fields) {
     
      if (results[0]) {
        return res.status(400).json({status:false,message: "Business phone number already exists as"+account,data:[] });
      } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(passwordhash, salt, (err, hash) => {
        if (err) throw err;
          const passwordhash = hash;
      var sql = "INSERT INTO `users`(`username`,`email`, `password`,`business_phone_no`,`mobile_money_phone_no`,`personal_phone_no`,`super_merchant_id`,`agency`,`address`,`map`,`city`,`region`,`country`,`account`,`amount`,`mpin`,`active`) VALUES ('"+req.body.userName+"','"+req.body.email+"','"+passwordhash+"','"+req.body.businessPhoneNumber+"','"+req.body.mobileMoneyPhoneNumber+"','"+req.body.personalPhoneNumber+"','"+req.body.superMerchant+"','"+req.body.agencyName+"','"+req.body.address+"','"+req.body.mapAddress+"','"+req.body.city+"','"+req.body.region+"','"+req.body.country+"','"+req.body.account+"','"+req.body.amount+"','"+MPIN+"','"+1+"')";
      connection.query(sql, function(err, result,fields)  {
        console.log(err)
        if(!err){
          return res.status(200).json({status:true, message: "Register successfully",data:result});  
        }else{
          return res.status(400).json({status:false, message: "Register failed",data:[] });
        }   

       });
    });
    });
  }
  });
  });

app.post("/userLogin", (req, res) => {
   const businessPhoneNumber = req.body.businessPhoneNumber;
   const password = req.body.password;
 var today = new Date();
   connection.query('SELECT * FROM users WHERE business_phone_no = ?',[businessPhoneNumber], function (error, results, fields) {
    if (!results[0]) {
       return res.status(400).json({status:false, message: "Mobile number not registered, please check.",data:[] });  
    }
           bcrypt.compare(password, results[0].password).then((isMatch) => {
            if(isMatch){
                return res.status(200).json({status:true, message: "User Logged in succesfully",data: results[0]});
            }else{
                return res.status(400).json({status:false, message: "Incorrect Password",data:[] });
            }
         });
       
    
    });
});

app.get('/region',(req,res)=>{
   connection.query('SELECT * FROM region', function (error, results, fields) {
    if (results[0]) {
           return res.status(200).json({status:true, message: "Region getting succesfully",data:results[0] });
        }else{
           return res.status(400).json({status:false, message: "Region getting not succesfully",data:[0] });
        }
    });
});

app.get('/supermerchant',(req,res)=>{
   connection.query('SELECT * FROM super_merchant', function (error, results, fields) {
    if (results[0]) {
           return res.status(200).json({status:true, message: "Supermerchant getting succesfully",data:results[0] });
        }else{
           return res.status(400).json({status:false, message: "Supermerchant getting not succesfully",data:[0] });
        }
    });
});

app.get('/agencyName', (req, res) => {
   connection.query('SELECT * FROM agency', function (error, results, fields) {
    if (results[0]) {
           return res.status(200).json({status:true, message: "agency getting succesfully",data:results[0] });
        }else{
           return res.status(400).json({status:false, message: "agency getting not succesfully",data:[0] });
        }
    });
})

app.get('/city',(req,res)=>{
    connection.query('SELECT * FROM city', function (error, results, fields) {
    if (results[0]) {
           return res.status(200).json({status:true, message: "City getting succesfully",data:results[0] });
        }else{
           return res.status(400).json({status:false, message: "City getting not succesfully",data:[0] });
        }
    });
});


app.get('/advertisement', (req, res) => {
   connection.query('SELECT * FROM advertisement', function (error, results, fields) {
    if (results[0]) {
           return res.status(200).json({status:true, message: "Advertisement getting succesfully",data:results[0] });
        }else{
           return res.status(400).json({status:false, message: "Advertisement getting not succesfully",data:[0] });
        }
    });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
app.post('/advertisement-add',upload.single("file"), (req, res) => {
    const file = req.file; 
    const meta = req.body;
    const image = req.file.filename;
    console.log(image)
    const image1 ="http://54.242.84.14:3000/"+image;
    console.log(image1)
    const categories= req.body.categories;
    const description=req.body.description;
    const active=1;
    var today = new Date();
   
      connection.query("INSERT INTO `advertisement`(`categories`,`image`, `url`,`description`,`active`) VALUES ('"+req.body.categories+"','"+image+"','"+image1+"','"+req.body.description+"','"+1+"')", function(err, result,fields)  {
       console.log(result,'results')
     if (!err) {
          return res.status(200).json({status:true, message: "Advertisement added succesfully",data:result });
        }else{
          return res.status(400).json({status:false, message: "Advertisement added not succesfully",data:[0] });
        }
  });
 }); 
app.post('/mpin',function(req,res){

const userId        = req.body.userId;
 const oldmpin      = req.body.oldmpin;
 const newmpin      = req.body.newmpin;
 var userid         = ObjectId(userId);
User.findById(userid).then((user) => {

if(user.mpin==oldmpin){

  let update = { mpin: newmpin };
            User.update({ _id:userid }, { $set: update }, function (err,result) {
              if (err) {
                return res
                  .status(400)
                  .json({ message: "Unable to update user.",data:[]});
              } else {
                return res.status(200).json({
                  success: true,
                  message: "MPIN updated successfully. Refreshing data...",
                  data:[result]
                });
              }
            });
}else{
   return res.status(400).json({success:false, message: "MPIN is mismatch.",data:[] }); 
}
});
})

app.post("/changepassword", (req, res) => {
 const businessPhoneNumber        = req.body.businessPhoneNumber;
 const newpassword                = req.body.newpassword;
  var today = new Date();
connection.query('SELECT * FROM users WHERE business_phone_no = ?',[businessPhoneNumber], function (error, results, fields) {
  if (results[0]) {
    
      bcrypt.genSalt(10, (err, salt) => {

          bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
             
          const passwordhash = hash;
          var sql = "UPDATE users SET password = '"+passwordhash +"' WHERE id = '"+results[0].id+"'";
          connection.query(sql, function (err, result) {
             if (err) {
                return res
                  .status(400)
                  .json({ message: "Unable to update user.",data:[]});
              } else {
                return res.status(200).json({
                  success: true,
                  message: "Password updated successfully. Refreshing data...",
                  data:result
                });
              }
          });

          });
      });

    }
  });
// User.find({businessPhoneNumber: businessPhoneNumber}, function(err, user){
//   console.log(user);
   
//         bcrypt.genSalt(10, (err, salt) => {
        
//           bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
          
//            if (err) throw err;
//             let update = { password: hash };
//             console.log(ObjectID);
//             User.update({ _id: ObjectId(user._id)}, { $set: update }, function (err,result) {
//               if (err) {
//                 return res
//                   .status(400)
//                   .json({ message: "Unable to update user.",data:[]});
//               } else {
//                 return res.status(200).json({
//                   success: true,
//                   message: "Password updated successfully. Refreshing data...",
//                   data:[result]
//                 });
//               }
//             });
//           });
    
//         });
    
//   });
});

app.use(express.static(path.join(__dirname, 'client/build')));


const port = process.env.PORT || 3000;
  var server = http.createServer(app);

app.get('/', function (req, res) {
    res.json({status:true});
});

//app.listen(port, () => console.log(`Server up and running on port ${port} !`));
server = server.listen(port, function () {
    console.log('server is running on port 3000')
});

var io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(socket.id,'socket id');

    socket.on('CREATEROOM', function(userid){
      if(userid)
      {
        socket.join(userid.toString());
      }
    });

    socket.on('SEND_MESSAGE', function (data) {
        console.log("Server");
        console.log(data);
        io.emit('RECEIVE_MESSAGE', data);
    })
});
socketio = io;
app.set('socket',io);
