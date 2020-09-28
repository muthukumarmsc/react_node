const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const async = require("async");
const DATE_FORMATER = require( 'dateformat' );
var   validator = require("express-validator");
var generator = require('generate-password');
const validateRegisterInput = require("../../validation/register");
const validateRegisterInput1 = require("../../validation/register1");
const validateCompanyInput = require("../../validation/company");
const validateLoginInput = require("../../validation/login");
const validateUpdateUserInput = require("../../validation/updateUser");
const validateEmailtemplateInput = require("../../validation/emailtemplate");
const validateForgotInput = require("../../validation/forgot");
const validateCmsInput = require("../../validation/cms");
const validateFaqInput = require("../../validation/faq");
const validateUpdateSettingsInput = require("../../validation/settings");
const validateSupportReplyInput = require("../../validation/support");
const validateSubscribeInput = require("../../validation/subscription");
const validateadvertisement = require("../../validation/advertisement");
const NewAdvertisement = require("../../models/Advertisement.js");
const Transfer = require("../../models/Transfer");
const position_table = require("../../models/position_table");
const Cms = require("../../models/cms");
const User = require("../../models/User");
const Company = require("../../models/Company");
const Region = require("../../models/Region");
const Account = require("../../models/Account");
const City = require("../../models/City");
const Subscription = require("../../models/Subscription");
const Supermerchant = require("../../models/Supermerchant");
const Agency = require("../../models/Agency");
const Transaction = require("../../models/Transaction");
const currency = require("../../models/currency");
const Faq = require("../../models/faq");
const Settings = require("../../models/settings");
const Contact = require("../../models/contactus");
const Support = require("../../models/support");
const Bonus = require("../../models/Bonus");
const Emailtemplates = require("../../models/emailtemplate");
const nodemailer = require("nodemailer");
const multer = require("multer");
const { ObjectId } = require("mongodb");
const Chat = require("../../models/Chat");
const FeeTable = require("../../models/FeeTable");
const RequestTable = require("../../models/Request");
const Web3 = require("web3");
const request = require("request");
const Assets = require("../../models/Assets");
const perpetual = require("../../models/perpetual");
const BankTransaction = require("../../models/banktransaction");
const cmspages = require("../../models/cmspage");
var mysql = require('mysql');
const web3 = new Web3(keys.infura);
var Tx = require("ethereumjs-tx").Transaction;
var rp = require("request-promise");
var CryptoJS = require("crypto-js");

var config = require('../../config/config.js');
var connection = mysql.createConnection(config.databaseOptions);
if(connection){
  console.log("Sql Connected!");
}else{

  console.log("Sql failed!");
}

//ripple
const RippleAPI = require("ripple-lib").RippleAPI;
const api = new RippleAPI({ server: keys.ripplehost });

router.post("/advertisement-list", (req, res) => {
   connection.query('SELECT * FROM advertisement', function (error, results, fields) {
    res.send(results);
    });
});

router.post("/company-data", (req, res) => {
    connection.query("SELECT * FROM agency ", function (error, results, fields) {
   if (error) throw error;
        res.send(results);
  });
});

router.post("/add-company-agency", (req, res) => {
 const { errors, isValid } = validateCompanyInput(req.body, "company");
  if (!isValid) {
    return res.status(400).json(errors);
  }else{
    var datetime = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );
    var sql = "INSERT INTO `agency`(`name`,`mobile_operator_name`,`address`,`creation_date`) VALUES ('"+req.body.name+"','"+req.body.mobileoperatorname+"','"+req.body.address+"','"+datetime+"')";
    connection.query(sql, function(err, result,fields)  {

   if(!err){
     return res.status(200).json({status:true, message: "Company/Agency added successfully" });  
   }else{
    return res.status(400).json({status:false, message: "Company/Agency added failed"});
   }
             
  });
  }; 
});

router.post("/company-agency-delete", (req, res) => {
  const id=req.body.id;
 connection.query("SELECT * FROM agency WHERE id= ?",id, function (error, results, fields) {
    var sql = "DELETE FROM agency WHERE id = '"+id+"'";
    connection.query(sql, function (err, result) {
   
    if (result) {
      return res.status(200).json({
        message: "Company/agency deleted successfully. Refreshing data...",
        success: true,
      });   
       } 
     });
   });
});

router.post("/company-agency-update", (req, res) => {
  const id = req.body._id;
  var datetime = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );
    connection.query("SELECT * FROM agency WHERE id= ?",id, function (error, results, fields) {
  
    if (results) {
       var sql = "UPDATE agency SET name = '"+req.body.name +"',mobile_operator_name='"+req.body.mobileoperatorname+"',address='"+req.body.address+"',updated_date='"+datetime+"' WHERE id ="+id+"";
      connection.query(sql, function (err, result) {

       if(!err){
        return res.status(200).json({
        message: "Company/Agency updated successfully. Refreshing data...",
        success: true,
      });    }    else{
          return res.status(400).json({status:false, message: "Company/Agency updated failed"});
   }
    });
    }
  });
});

router.post("/company-agency-changestatus", function (req, res) {
  var pdata = req.body.id;
   connection.query('SELECT * FROM agency WHERE id = ?',pdata, function (error, results, fields) {   
    if (results[0].active != '0') {
        var newstatus = 0;
        var title = "Deactivated";
      } else if (results[0].active != '1') {
        var newstatus = 1;
        var title = "Activated";
      }
     var sql = "UPDATE agency SET active = "+newstatus +" WHERE id = "+pdata+"";
      connection.query(sql, function (err, result) {
      
       if(!err){
          return res.status(200).json({status:true, message: "User status" + " "+title+" changed successfully",});  
   }    else{
          return res.status(400).json({status:false, message: "User status changed failed",data:[] });
   }
    });

  });
});

router.post("/subscription-add", (req, res) => {
const { errors, isValid } = validateSubscribeInput(req.body, "subscription");
  if (!isValid) {
    return res.status(400).json(errors);
  }else{

    var datetime = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );
    var sql = "INSERT INTO `subscription`(`name`,`category_name`,`amount`,`duration`,`features`,`creation_date`,`status`) VALUES ('"+req.body.name+"','"+req.body.categoryname+"','"+req.body.price+"','"+req.body.duration+"','"+req.body.features+"','"+datetime+"',"+1+")";
    connection.query(sql, function(err, result,fields)  {

   if(!err){
     return res.status(200).json({status:true, message: "Subscription added successfully" });  
   }else{
    return res.status(400).json({status:false, message: "Subscription added failed"});
   }             
  });
}
});

router.post("/subscription-update", (req, res) => {

  const sub_id = req.body._id;
  var datetime = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );
  connection.query("SELECT * FROM subscription WHERE id= ?",sub_id, function (error, results, fields) {
    if (results[0]) {

      var sql = "UPDATE subscription SET name = '"+req.body.name +"',category_name='"+req.body.categoryname+"',amount='"+req.body.price+"',duration='"+req.body.duration+"',features='"+req.body.features+"',updated_date='"+datetime+"' WHERE id ="+sub_id+"";
      connection.query(sql, function (err, result) {
        console.log(err)
       if(!err){
         return res.status(200).json({
        message: "Subscription updated successfully. Refreshing data...",
        success: true,
      });  
   }    else{
          return res.status(400).json({status:false, message: "subscription updated failed",data:[] });
   }
    });
    }else {
      return res.status(400).json({ message: "Now user found to update." });
    }
  });
});

router.post("/subscription-delete", (req, res) => {
  const id=req.body.id;
  console.log(id)
    connection.query("SELECT * FROM subscription WHERE id= ?",id, function (error, results, fields) {
    var sql = "DELETE FROM subscription WHERE id = '"+id+"'";
    connection.query(sql, function (err, result) {
   
    if (result) {
      return res.status(200).json({
        message: "Subscription deleted successfully. Refreshing data...",
        success: true,
      });   
       } 
     });
   });
});

router.get('/mobileoperatorname', (req, res) => {
    Company.find({}).then(user => {
        if (user) {
            return res.status(200).send(user);
        }
    });
}); 

router.post('/user-add1',function(req,res){
  const  account=req.body.account;
  var MPIN = Math.floor(1000 + Math.random() * 9000);
    const passwordhash=req.body.password;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(passwordhash, salt, (err, hash) => {
          if (err) throw err;
         const passwordhash = hash;

var sql = "INSERT INTO `customer`(`first_name`,`email`, `password`,`status`) VALUES ('"+req.body.userName+"','"+req.body.email+"','"+passwordhash+"',"+1+")";
connection.query(sql, function(err, result,fields)  {
  console.log(err)
   if(!err){
     return res.status(200).json({status:true, message: "Register successfully" });  
   }else{
    return res.status(400).json({status:false, message: "Register failed",data:[] });
   }
             
  });
});
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

router.post('/user-add',upload.single('file'),function(req,res){
  
  const file = req.file; 
  const image = req.file.filename;
  const  account=req.body.account;
  const email1  =req.body.email;
  var MPIN = Math.floor(1000 + Math.random() * 9000);
  var datetime = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );
  var password1 = generator.generate({
    length: 20,
    numbers: true
});
 
 connection.query("SELECT * FROM customer WHERE email= ?",email1, function (error, results, fields) {
    if (results[0]) {
        return res.status(400).json({ email: "Email is already exists" });
    }else{
 
  var sql = "INSERT INTO `customer`(`first_name`,`last_name`,`password`,`email`,`code`,`user_phone_number`,`phone_number1`,`phone_number2`,`momo_number`,`address`,`map`,`city`,`picture`,`balance`,`creation_date`,`status`) VALUES ('"+req.body.firstname+"','"+req.body.lastname+"','"+password1+"','"+req.body.email+"','"+req.body.code+"','"+req.body.businessPhoneNumber+"','"+req.body.phone_number1+"','"+req.body.phone_number2+"','"+req.body.momo_code+"','"+req.body.address+"','"+req.body.mapAddress+"','"+req.body.city+"','"+image+"','"+req.body.balance+"','"+datetime+"','"+1+"')";
  connection.query(sql, function(err, result,fields)  {
  console.log(err)
      var smtpConfig = {
        service: keys.serverName,
          auth: {
            user: keys.fromemail,
            pass: keys.password,
          },
          host: keys.host,
          port: keys.port,
          tls: {
          rejectUnauthorized: false
        },
      };
      
    var transporter = nodemailer.createTransport(smtpConfig);
        var mailOptions = {
          from: keys.fromName + "<" + keys.fromemail + ">", // sender address
          to:  email1, // list of receivers
          subject: 'Welcome to easysoft', // Subject line
          html: "<html><body>Admin site url:"+keys.frondendurl+"<br/>Email:"+email1+"</body></html>",// html body
        }; 
        transporter.sendMail(mailOptions, function (error, info) {

   if(!error){
     return res.status(200).json({status:true, message: "User Added successfully"});  
   }else{
    return res.status(400).json({status:false, message: "User Added failed",data:[] });
   }
             
  });
});
}
});
});

router.post("/addHelpdesk",(req,res)=>{
const id= req.body;
var datetime = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );
var sql = "INSERT INTO `helpdesk`(`username`,`email`, `user_type`,`query_generated`,`created_date`) VALUES ('"+req.body.username+"','"+req.body.email+"','"+req.body.account+"','"+req.body.Query_generated+"','"+datetime+"')";
connection.query(sql, function(err, result,fields)  {
  console.log(err)
   if(!err){
     return res.status(200).json({status:true, message: "Register successfully" });  
   }else{
    return res.status(400).json({status:false, message: "Register failed",data:[] });
   }
             
  });
});

router.post("/user-data", (req, res) => {
  connection.query("SELECT * FROM customer WHERE id!=1", function (error, results, fields) {
   if (error) throw error;
    res.send(results);
  });
});

router.post("/user-update",upload.single('file'), (req, res) => {
  const id = req.body._id;
    var datetime = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );
      connection.query("SELECT * FROM customer WHERE id= ?",id, function (error, results, fields) {
        if (results) {
   
      var sql = "UPDATE customer SET first_name = '"+req.body.first_name +"',last_name = '"+req.body.last_name +"',email='"+req.body.email+"',user_phone_number='"+req.body.user_phone_number+"',address='"+req.body.address+"',map='"+req.body.map+"',city='"+req.body.city+"',balance='"+req.body.balance+"',picture='"+req.body.file+"',update_date='"+datetime+"' WHERE id ="+id+"";
      connection.query(sql, function (err, result) {
     
       if(!err){
         return res.status(200).json({
        message: "User updated successfully. Refreshing data...",
        success: true,
      });  

   }    else{
          return res.status(400).json({status:false, message: "User updated failed",data:[] });
   }
    });
    }
   });
});

router.post("/user-changestatus", function (req, res) {
  var pdata = req.body.id;
  var today = new Date();
    connection.query('SELECT * FROM customer WHERE id = ?',pdata, function (error, results, fields) {   
    if (results[0].status != '0') {
        var newstatus = 0;
        var title = "Deactivated";
      } else if (results[0].status != '1') {
        var newstatus = 1;
        var title = "Activated";
      }

     var sql = "UPDATE customer SET status = "+newstatus +" WHERE id = "+pdata+"";
      connection.query(sql, function (err, result) {
      
       if(!err){
          return res.status(200).json({status:true, message: "User status" + " "+title+" changed successfully",data:sql });  
   }    else{
          return res.status(400).json({status:false, message: "User status changed failed",data:[] });
   }
    });

  });
});

router.post("/user-delete", (req, res) => {
    const id=req.body.id;
    connection.query("SELECT * FROM customer WHERE id= ?",id, function (error, results, fields) {
    var sql = "DELETE FROM customer WHERE id = '"+id+"'";
    connection.query(sql, function (err, result) {
   
    if (result) {
      return res.status(200).json({
        message: "User deleted successfully. Refreshing data...",
        success: true,
      });   
       } 
     });
   });
});

router.get('/superMerchant', (req, res) => {
   connection.query("SELECT * FROM super_merchant ", function (error, results, fields) {
   if (error) throw error;
        res.send(results);
  });
});


router.get('/agencyName', (req, res) => {
  var findQuery={};
  if(typeof req.query.super_merchant_id!='undefined'){
    findQuery.super_merchant_id = req.query.super_merchant_id;
  }
   connection.query("SELECT * FROM agency WHERE  ?",[findQuery], function (error, results, fields) {
   if (error) throw error;
        res.send(results);
  });
    
})

router.get('/region', (req, res) => {
   connection.query("SELECT * FROM region ", function (error, results, fields) {
   if (error) throw error;
        res.send(results);
  });
});

router.get('/city', (req, res) => {
  var findQuery={};
  if(typeof req.query.region_id!='undefined'){
    findQuery.region_id = req.query.region_id;
  }
   connection.query("SELECT * FROM city WHERE  ?",[findQuery], function (error, results, fields) {
   if (error) throw error;
        res.send(results);
  });
    
})

router.get('/account', (req, res) => {
    User.find({}).then(result => {
        if (result) {
            return res.status(200).send(result);
        }
    });
})

router.get('/account1', (req, res) => {
    Account.find({}).then(result => {
        if (result) {
            return res.status(200).send(result); 
        }
    });
});

router.post("/changepassword", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body, "password");
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const id = req.body._id;
 connection.query("SELECT * FROM customer WHERE id= ?",id, function (error, results, fields) {
 bcrypt.compare(req.body.oldpassword, results[0].password).then((isMatch) => {
   if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
             if (err) throw err;
              const passwordhash = hash;
              var sql = "UPDATE customer SET password = '"+passwordhash +"' WHERE id = "+id+"";
          connection.query(sql, function (err, result) {
          if(!err){
            return res.status(200).json({status:true, message: "User password changed successfully"});  
        }else{
            return res.status(400).json({status:false, message: "User password changed failed",data:[] });
        }
    });
     });
  });
  }
 });
 }); 
});

router.post("/resetUser", (req, res) => {
  const id = req.body._id;
  connection.query("SELECT * FROM customer WHERE id= ?",id, function (error, results, fields) {
  const password=req.body.password;
  const password1=req.body.password1;
  if (password!=password1) {
       return res.status(400).json({ email: "Password does not match" });
  }else{
          bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
             if (err) throw err;
              const passwordhash = hash;
              var sql = "UPDATE customer SET password = '"+passwordhash +"' WHERE id = "+id+"";
             connection.query(sql, function (err, result) {
        
         if(!err){
          return res.status(200).json({
        message: "Your password changed successfully. Refreshing data...",
        success: true,
      });   
        }else{
          return res.status(400).json({status:false, message: "password changed failed" });
        }
    });
     });
  });
  }
 }); 
});
router.get("/userget/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM customer  WHERE id= ?",id, function (error, results, fields) {
    if (results[0]) {
      return res.status(200).send(results[0]);
    }
  });
});

router.post("/forgot", (req, res) => {
  const { errors, isValid } = validateForgotInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
 connection.query("SELECT * FROM customer WHERE email= ?",req.body.email, function (error, results, fields) {
    if (!results[0]) {
        return res.status(400).json({ email: "Email not exists" });
    }else{

       var smtpConfig = {
          service: keys.serverName,
          auth: {
            user: keys.fromemail,
            pass: keys.password,
          },
          host: keys.host,
          port: keys.port,
          tls: {
          rejectUnauthorized: false
        },
        };
        
        var transporter = nodemailer.createTransport(smtpConfig);
        var mailOptions = {
          from: keys.fromName + "<" + keys.fromemail + ">", // sender address
          to:   results[0].email, // list of receivers
          subject: 'Reset your account password', // Subject line

          html: '<h4><b>Reset Password</b></h4>' +'<p>To reset your password, complete this form:</p>' +"<html><body>Admin site url:"+keys.forgoturl+results[0].id+"</body></html>",// html body
        }; 
         
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return console.log(error);
          }else{
          return res.status(400).json({status:false, message: "Reset Password link sent to Registered Mail I...",data:[] });
          }
        });
    }
  });
});

router.post("/transaction-data", (req, res) => {
  connection.query("select * from transfer", function (error, results, fields) {
   if (error) throw error;
    res.send(results);
  });
});

router.post("/subscription-data", (req, res) => {
connection.query("select * from subscription", function (error, results, fields) {
   if (error) throw error;
    res.send(results);
  });
});

router.post("/transaction-delete", (req, res) => {
  Transfer.deleteOne({ _id: req.body._id }).then((user) => {
    if (user) {
      return res.status(200).json({
        message: "Transaction deleted successfully. Refreshing data...",
        success: true,
      });
    }
  });
});

router.post("/advertisement-delete", (req, res) => {
  const id=req.body.id;
    connection.query("SELECT * FROM advertisement WHERE id= ?",id, function (error, results, fields) {
    var sql = "DELETE FROM advertisement WHERE id = '"+id+"'";
    connection.query(sql, function (err, result) {
   
    if (result) {
      return res.status(200).json({
        message: "Advertisement deleted successfully. Refreshing data...",
        success: true,
      });   
       } 
     });
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

router.post('/advertisement-add',upload.single("file"), (req, res) => {
  const { errors, isValid } =validateadvertisement(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
    const file = req.file; 
    const meta = req.body;
    const image = req.file.filename;
    console.log(file,'file')
  
    const image1 ="http://54.242.84.14:3000/"+image;
    
    const categories= req.body.categories;
    const description=req.body.description;
    const active=1;
    var today = new Date();
   
      connection.query("INSERT INTO `advertisement`(`categories`,`image`, `url`,`description`,`active`) VALUES ('"+req.body.categories+"','"+image+"','"+image1+"','"+req.body.description+"','"+1+"')", function(err, result,fields)  {
    
     if (!err) {
          return res.status(200).json({status:true, message: "Advertisement added succesfully",data:result });
        }else{
          return res.status(400).json({status:false, message: "Advertisement added not succesfully",data:[0] });
        }
  });
 }); 

router.post("/profileupload", upload.single("file"), (req, res) => {
  const file     = req.file; 
  const meta     = req.body; 
  const id       = req.body._id;
  console.log(file,'fields')
  console.log(meta,'body')
 if (file != "" && file != undefined) {
   const profile  = req.file.filename;
   connection.query("SELECT * FROM customer WHERE id= ?",id, function (error, results, fields) {
    if (results) {
      var sql = "UPDATE customer SET first_name = '"+req.body.first_name +"',last_name = '"+req.body.last_name +"',email = '"+req.body.email +"',user_phone_number='"+req.body.user_phone_number+"',picture='"+profile+"' WHERE id ="+id+"";
      connection.query(sql, function (err, result) {
       console.log(err)
       if(!err){
          return res.status(200).json({status:true, message: "User profile updated successfully",data:result });  
   }    else{
          return res.status(400).json({status:false, message: "User  profile updated failed",data:[] });
   }
    });
    }
   });
 }else if (file == undefined){
    connection.query("SELECT * FROM customer WHERE id= ?",id, function (error, results, fields) {
    if (results) {
      var sql = "UPDATE customer SET first_name = '"+req.body.first_name +"',last_name = '"+req.body.last_name +"',email='"+req.body.email+"',user_phone_number='"+req.body.user_phone_number+"' WHERE id ="+id+"";
      connection.query(sql, function (err, result) {
       
       if(!err){
          return res.status(200).json({status:true, message: "User profile updated successfully",data:result });  
   }    else{
          return res.status(400).json({status:false, message: "User  profile updated failed",data:[] });
   }
    });
    }
   });
 }
});

router.post("/updateAdvertisement", upload.single("file"), (req, res) => {
 
   const file = req.file; // file passed from client
   const meta = req.body;
  
  const profile = meta.image;
  let update = {};
  if (file != "" && file != undefined) {
    const profile = meta.image;
   
    update = {
      categories: req.body.categories,
      url: req.body.url,
      description:req.body.description,
      image: profile,
    };
  } else {
    update = { categories: req.body.categories, url: req.body.url,description:req.body.description,image:profile };
  }
  
   const id = req.body._id;
   connection.query("SELECT * FROM advertisement WHERE id= ?",id, function (error, results, fields) {
    if (results) {

      var sql = "UPDATE advertisement SET categories = '"+req.body.categories +"',url='"+req.body.url+"',description='"+req.body.description+"',image='"+req.body.image+"' WHERE id ="+id+"";
      connection.query(sql, function (err, result) {
      
       if(!err){
          return res.status(200).json({status:true, message: "Advertisement updated successfully",data:sql });  
   }    else{
          return res.status(400).json({status:false, message: "Advertisement updated failed",data:[] });
   }
    });
    }
   });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  
    connection.query('SELECT * FROM customer WHERE email = ?',[email], function (error, results, fields) {
    if (!results[0]) {
       return res.status(400).json({status:false, message: "Mobile number not registered, please check.",data:[] });  
    }
      bcrypt.compare(password, results[0].password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: results[0].id,
            name: results[0].first_name,
            moderator: results[0].moderator,
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res.status(400).json({ message: "Password incorrect" });
        }
      });
  });
});

router.post("/advertisement-changestatus", function (req, res) {
  var pdata = req.body.id;
  var today = new Date();
  
    connection.query('SELECT * FROM advertisement WHERE id = ?',pdata, function (error, results, fields) {   

    if (results[0].active != '0') {
        var newstatus = 0;
        var title = "Deactivated";
      } else if (results[0].active != '1') {
        var newstatus = 1;
        var title = "Activated";
      }

     var sql = "UPDATE advertisement SET active = "+newstatus +" WHERE id = "+pdata+"";
      connection.query(sql, function (err, result) {
      
       if(!err){
          return res.status(200).json({status:true, message: "Advertisement status changed successfully",data:sql });  
   }    else{
          return res.status(400).json({status:false, message: "Advertisement status changed failed",data:[] });
   }
    });

  });
});

router.post("/subscription-changestatus", function (req, res) {

  var pdata = req.body.id;
   connection.query('SELECT * FROM subscription WHERE id = ?',pdata, function (error, results, fields) {   
    if (results[0].status != '0') {
        var newstatus = 0;
        var title = "Deactivated";
      } else if (results[0].status != '1') {
        var newstatus = 1;
        var title = "Activated";
      }
     var sql = "UPDATE subscription SET status = "+newstatus +" WHERE id = "+pdata+"";
      connection.query(sql, function (err, result) {
      console.log(err)
       if(!err){
          return res.status(200).json({status:true, message: "Subscription status" + " "+title+" changed successfully",});  
   }    else{
          return res.status(400).json({status:false, message: "Subscription status changed failed",data:[] });
   }
    });

  });
});
router.post("/blockuser", function (req, res) {
  var pdata = req.body;
  console.log(pdata, "pdata");

  User.findOneAndUpdate(
    { _id: pdata._id },
    { $set: { blocktime: new Date(), blockhours: pdata.blocking_time } },
    { new: true }
  ).exec(function (uperr, resUpdate) {
    console.log(resUpdate, "resUpdate");
    if (!uperr) {
      console.log(resUpdate);
      res.json({ status: true, message: "Chat process blocked successfully" });
    } else {
      res.json({
        status: false,
        message: "Some error was occurred while updating user status",
      });
    }
  });
});

router.post("/addbonus", function (req, res) {
  var pdata = req.body;
  console.log(pdata, "pdata");
  updatebaldata = {};
  updatebaldata["tempcurrency"] = pdata.bonus_amount;
  Assets.findOneAndUpdate(
    { currencySymbol: "BTC", userId: ObjectId(pdata._id) },
    { $inc: updatebaldata },
    { new: true, fields: { balance: 1 } },
    function (balerr, baldata) {
      const newBonus = new Bonus({
        userId: pdata._id,
        bonus_amount: pdata.bonus_amount,
        type: "3",
      });
      newBonus.save(function (err, data) {
        // console.log(err,'err')
        // console.log(data,'data')
      });
      if (!balerr) {
        res.json({ status: true, message: "Bonus added successfully" });
      } else {
        res.json({
          status: false,
          message: "Some error was occurred while updating bonus",
        });
      }
    }
  );
});

router.post("/user-changemoderator", function (req, res) {
  var pdata = req.body;
  console.log(pdata, "pdata");
  User.findOne({ _id: pdata }, { moderator: 1 }).then((results) => {
    console.log(results, "results");
    try {
      if (results.moderator == "1") {
        var newstatus = "0";
        var title = "Deactivated";
      } else {
        var newstatus = "1";

        var title = "Activated";
      }
      User.findOneAndUpdate(
        { _id: pdata },
        { $set: { moderator: newstatus } },
        { new: true, fields: { password: 0, loginhistory: 0 } }
      ).exec(function (uperr, resUpdate) {
        console.log(resUpdate, "resUpdate");
        if (!uperr) {
          console.log(resUpdate);
          res.json({
            status: true,
            message: "Moderator status " + title + " successfully",
          });
        } else {
          res.json({
            status: false,
            message: "Some error was occurred while updating moderator status",
          });
        }
      });
    } catch (err) {
      console.log(err, "err");
      res.json({
        status: false,
        message: "Some error was occurred while updating user status" + err,
      });
    }
  });
});

router.post("/support-data", (req, res) => {
  Support.find({})
    .sort({ _id: -1 })
    .then((support_data) => {
      if (support_data) {
        return res.status(200).send(support_data);
      }
    });
});

router.post("/support-delete", (req, res) => {
  Support.deleteOne({ _id: req.body._id }).then((support_data) => {
    if (support_data) {
      return res.status(200).json({
        message: "Contact deleted successfully. Refreshing data...",
        success: true,
      });
    }
  });
});

router.post("/support-reply", (req, res) => {
  const pdata = req.body._id;
  console.log(pdata, "resssssssssssssssssssssssaaaaaaaa");
  Support.findOne({ _id: pdata.id }, {}).then((support_data) => {
    console.log(support_data, "support_data");
    if (support_data) {
      return res.status(200).send(support_data);
    }
  });
});
router.post("/support-reply_view", (req, res) => {
  const pdata = req.body._id;
  console.log(pdata, "resssssssssssssssssssssssaaaaaaaa");
  Support.findOne({ _id: pdata.id }, { reply: 1 }).then((support_data1) => {
    console.log(support_data1, "support_data1");
    if (support_data) {
      return res.status(200).send(support_data1);
    }
  });
});
var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/static/support_images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload2 = multer({ storage: storage2 });
//multer({ storage: storage, limits: {fileSize: 100000000} });
router.post("/support_reply_admin", upload2.single("file"), function (
  req,
  res
) {
  const { errors, isValid } = validateSupportReplyInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const file = req.file;
  const details = req.body;

  var attachment1 = "";

  if (file != "" && file != undefined) {
    attachment1 = req.file.filename;
  } else {
    attachment1 = null;
  } // check DB
  var reply_details = {
    message_query: details.message_query,
    replytype: "admin",
    /* "replyby"      : ObjectId(req.session.adminid_b),*/
    replydate: new Date(),
    query_image: attachment1,
  };

  Support.findOneAndUpdate(
    { _id: ObjectId(details._id) },
    { $set: { reply_status: "replied" }, $push: { reply: reply_details } },
    { new: true },
    function (err, supdata) {
      console.log(supdata, "supdata");
      if (err) {
        return res.status(400).json({ message: "some error occurred" });
      } else {
        return res
          .status(200)
          .json({ message: "Reply to the Ticket. Refreshing data..." });
      }
    }
  );
});

// chat
router.post("/chat-add", (req, res) => {
  const chatMsg = new Chat({
    userId: req.body.userId,
    message: req.body.message,
  });
  chatMsg
    .save()
    .then((faq) => {
      return res.status(200).json({
        status: true,
        message: "Chat added successfully. Refreshing data...",
      });
    })
    .catch((err) => console.log(err));
});

router.get("/chat-data", (req, res) => {
  Chat.find({
    createddate: {
      $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    },
  })
    .populate("userId", "name email moderator ")
    .sort({ _id: -1 })
    .exec(function (err, chat) {
      if (chat) {
        return res.status(200).send(chat);
      }
    });
});

router.post("/updatedynamic", (req, res) => {
  const passdata = req.body;
  console.log("Fee data===", passdata);
  var value = passdata.update;
  // const FeetableStructure = new FeeTable({
  //   firstlevel: value.firstlevel,
  //   minamount: value.minamount,
  //   signup_bonus: value.signup_bonus,
  //   deposit_bonus: value.deposit_bonus,
  //   promo_bonus: value.promo_bonus,
  //   transactionfee: value.transactionfee,
  // });
  // FeetableStructure.save()
  FeeTable.findOneAndUpdate(
    { _id: ObjectId("5ee3622aea4d5f6101b71238") },
    update
  )
    .then((result) => {
      return res
        .status(200)
        .json({ status: true, message: "Fee Structure updated" });
    })
    .catch((err) => console.log(err));
});

router.post("/fiat-data", (req, res) => {
  BankTransaction.find({ status: "Pending" })
    .populate({ path: "user_id", select: "email" })
    .sort({ _id: -1 })
    .then((result) => {
      console.log("result in bank", result);
      return res.status(200).send(result);
    });
});

router.post("/withdraw-data", (req, res) => {
  RequestTable.find({ status: "Pending" })
    // .populate("receiveraddress")
    .populate({ path: "userId", select: "email" })
    .sort({ _id: -1 })
    .then((result) => {
      if (result) {
        resultarr = [];
        for (i = 0; i < result.length; i++) {
          var userId = result[i].userId ? result[i].userId.email : "";
          var receiveraddress = result[i].receiveraddress;
          // ? result[i].receiveraddress.address
          // : "";
          var _id = result[i]._id ? result[i]._id : "";
          var cryptoType = result[i].cryptoType ? result[i].cryptoType : "";
          var transferamount = result[i].transferamount
            ? result[i].transferamount
            : "";
          var txid = result[i].txid ? result[i].txid : "";
          var created_date = result[i].created_date
            ? result[i].created_date
            : "";
          var status = result[i].status ? result[i].status : "";
          var data1 = new Date(created_date);
          let date =
            data1.getFullYear() +
            "-" +
            (data1.getMonth() + 1) +
            "-" +
            data1.getDate() +
            " " +
            data1.getHours() +
            ":" +
            data1.getMinutes() +
            ":" +
            data1.getSeconds();

          resultobj = {
            _id: _id,
            userId: userId,
            cryptoType: cryptoType,
            receiveraddress: receiveraddress,
            created_date: date,
            status: status,
            transferamount: parseFloat(transferamount).toFixed(8),
          };

          resultarr.push(resultobj);
        }
        return res.status(200).send(resultarr);
      }
    });
});

router.post("/Userbalance-data", (req, res) => {
  Assets.find({})
    .populate({ path: "userId", select: "email" })
    .sort({ _id: -1 })
    .then((result) => {
      if (result) {
        resultarr = [];
        for (i = 0; i < result.length; i++) {
          var userId = result[i].userId ? result[i].userId.email : "";
          var tempcurrency = result[i].tempcurrency
            ? result[i].tempcurrency
            : 0;
          var balance = result[i].balance ? result[i].balance : 0;
          resultobj = {
            userId: userId,
            tempcurrency: parseFloat(tempcurrency).toFixed(8),
            balance: parseFloat(balance).toFixed(8),
          };

          resultarr.push(resultobj);
        }
        return res.status(200).send(resultarr);
      }
    });
});

router.post("/deposit-data", (req, res) => {
  Transaction.find({ transferType: "TOUSER" })
    .populate({ path: "user_id", select: "email" })
    .sort({ _id: -1 })
    .then((result) => {
      if (result) {
        resultarr = [];
        for (i = 0; i < result.length; i++) {
          var user_id = result[i].user_id ? result[i].user_id.email : "";
          var toaddress = result[i].toaddress ? result[i].toaddress : "";
          var currency = result[i].currency ? result[i].currency : "";
          var amount = result[i].amount ? result[i].amount : "";
          var txid = result[i].txid ? result[i].txid : "";
          var created_date = result[i].created_date
            ? result[i].created_date
            : "";
          var status = result[i].status ? "Confirmed" : "";
          var data1 = new Date(created_date);
          let date =
            data1.getFullYear() +
            "-" +
            (data1.getMonth() + 1) +
            "-" +
            data1.getDate() +
            " " +
            data1.getHours() +
            ":" +
            data1.getMinutes() +
            ":" +
            data1.getSeconds();
          resultobj = {
            user_id: user_id,
            currency: currency,
            toaddress: toaddress,
            txid: txid,
            created_date: date,
            status: status,
            amount: parseFloat(amount).toFixed(8),
          };

          resultarr.push(resultobj);
        }
        return res.status(200).send(resultarr);
      }
    });
});

router.post("/liquidated-data", (req, res) => {
  position_table
    .find({ exit_type: "Liquidated" })
    .populate({ path: "userId", select: "email" })
    .sort({ _id: -1 })
    .then((result) => {
      if (result) {
        resultarr = [];
        for (i = 0; i < result.length; i++) {
          var user_id = result[i].userId ? result[i].userId.email : "";
          var quantity = result[i].quantity ? result[i].quantity : "";
          var pairname = result[i].pairname ? result[i].pairname : "";
          var entry_price = result[i].entry_price ? result[i].entry_price : "";
          var profitnloss = result[i].profitnloss ? result[i].profitnloss : "";
          var exit_price = result[i].exit_price ? result[i].exit_price : "";
          var createdDate = result[i].createdDate ? result[i].createdDate : "";
          var closing_direction = result[i].closing_direction
            ? result[i].closing_direction
            : "";
          var data1 = new Date(createdDate);
          let date =
            data1.getFullYear() +
            "-" +
            (data1.getMonth() + 1) +
            "-" +
            data1.getDate() +
            " " +
            data1.getHours() +
            ":" +
            data1.getMinutes() +
            ":" +
            data1.getSeconds();

          resultobj = {
            pairname: pairname,
            user_id: user_id,
            quantity: parseFloat(quantity).toFixed(8),
            entry_price: parseFloat(entry_price).toFixed(2),
            exit_price: parseFloat(exit_price).toFixed(2),
            profitnloss: parseFloat(profitnloss).toFixed(8),
            closing_direction: closing_direction,
            createdDate: date,
          };
          resultarr.push(resultobj);
        }
        return res.status(200).send(resultarr);
      }
    });
});

router.post("/updatefiatdeposit", (req, res) => {
  var updateVal = { status: req.body.status };
  BankTransaction.findByIdAndUpdate(
    { _id: ObjectId(req.body.id) },
    updateVal,
    { new: true },
    function (err, assetupdatedata) {
      if (assetupdatedata) {
        if (req.body.status == "Confirmed") {
          if (assetupdatedata.transferType == "Deposit") {
            var jsonfilter = {
              identifier: "User_deposit",
            };
            var amount = assetupdatedata.Amount;
            var ReferenceId = assetupdatedata.ReferenceId;
            var currency = assetupdatedata.currency;

            Assets.findOneAndUpdate(
              { userId: assetupdatedata.user_id, currencySymbol: currency },
              {
                $inc: { balance: amount },
              },
              { new: true }
            ).exec(function (uperr, resUpdate) {
              User.findById(assetupdatedata.user_id).then((userdata) => {
                var useremail = userdata.email;
                Emailtemplates.findOne(jsonfilter, { _id: 0 }, function (
                  err,
                  templates
                ) {
                  if (templates) {
                    if (templates.content) {
                      templateData = templates;
                      templateData.content = templateData.content.replace(
                        /##templateInfo_name##/g,
                        useremail
                      );
                      templateData.content = templateData.content.replace(
                        /##templateInfo_appName##/g,
                        keys.siteName
                      );
                      templateData.content = templateData.content.replace(
                        /##DATE##/g,
                        new Date()
                      );
                      templateData.content = templateData.content.replace(
                        /##AMOUNT##/g,
                        amount
                      );
                      templateData.content = templateData.content.replace(
                        /##TXID##/g,
                        ReferenceId
                      );
                      templateData.content = templateData.content.replace(
                        /##CURRENCY##/g,
                        currency
                      );
                      var smtpConfig = {
                        service: keys.serverName,
                        auth: {
                          user: keys.email,
                          pass: keys.password,
                        },
                        host: keys.host,
                        port: keys.port,
                      };
                      var transporter = nodemailer.createTransport(smtpConfig);

                      var mailOptions = {
                        from: keys.fromName + "<" + keys.fromemail + ">", // sender address
                        to: useremail, // list of receivers
                        subject: templateData.subject, // Subject line
                        html: templateData.content, // html body
                      };
                      transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                          return console.log(error);
                        } else {
                          res.json({
                            status: true,
                            message: " Request " + req.body.status,
                          });
                        }
                      });
                    }
                  }
                });
              });
            });
          } else {
            var ReferenceId = req.body.ReferenceId;

            var updateVal = {
              ReferenceId: ReferenceId,
            };
            BankTransaction.findByIdAndUpdate(
              { _id: ObjectId(req.body.id) },
              updateVal,
              { new: true },
              function (err, assetupdatedata) {
                var userid = assetupdatedata.user_id;
                var jsonfilter = {
                  identifier: "Withdraw_notification",
                };

                User.findById(userid).then((userdata) => {
                  var useremail = userdata.email;

                  Emailtemplates.findOne(jsonfilter, { _id: 0 }, function (
                    err,
                    templates
                  ) {
                    if (templates.content) {
                      templateData = templates;
                      templateData.content = templateData.content.replace(
                        /##templateInfo_name##/g,
                        useremail
                      );
                      templateData.content = templateData.content.replace(
                        /##templateInfo_appName##/g,
                        keys.siteName
                      );
                      templateData.content = templateData.content.replace(
                        /##DATE##/g,
                        new Date()
                      );
                      templateData.content = templateData.content.replace(
                        /##AMOUNT##/g,
                        assetupdatedata.Amount
                      );
                      templateData.content = templateData.content.replace(
                        /##TXID##/g,
                        ReferenceId
                      );
                      templateData.content = templateData.content.replace(
                        /##CURRENCY##/g,
                        "INR"
                      );
                      var smtpConfig = {
                        // host: keys.host, // Amazon email SMTP hostname
                        // auth: {
                        //   user: keys.email,
                        //   pass: keys.password,
                        // },
                        service: keys.serverName,
                        auth: {
                          user: keys.email,
                          pass: keys.password,
                        },
                        host: keys.host,
                        port: keys.port,
                      };
                      var transporter = nodemailer.createTransport(smtpConfig);

                      var mailOptions = {
                        from: keys.fromName + "<" + keys.fromemail + ">", // sender address
                        to: useremail, // list of receivers
                        subject: templateData.subject, // Subject line
                        html: templateData.content, // html body
                      };
                      transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                          return console.log(error);
                        }
                      });
                    }
                  });
                });
                res.json({
                  status: true,
                  message: "Withdraw Request " + req.body.status,
                });
              }
            );
          }
        } else {
          res.json({
            status: true,
            message: " Request " + req.body.status,
          });
        }
      } else {
      }
    }
  );
});
router.post("/updatewithdraw", (req, res) => {
  // console.log(req.body, "req.body");
  var updateVal = { status: req.body.status };
  RequestTable.findByIdAndUpdate(
    { _id: ObjectId(req.body.id) },
    updateVal,
    { new: true },
    function (err, assetupdatedata) {
      if (!err) {
        if (req.body.status == "Confirmed") {
          RequestTable.findOne({ _id: ObjectId(req.body.id) })
            // .populate({ path: "userId", select: "email" })
            .populate("userId", "email name userid")
            .then((assetupdatedata) => {
              // console.log(err, "err");
              // console.log(assetupdatedata, "assetupdatedata");
              var currency = assetupdatedata.cryptoType;
              var currencyuserid = assetupdatedata.userId.userid;
              var sendertagid = assetupdatedata.tagid;
              if (assetupdatedata) {
                if (assetupdatedata.cryptoType == "XRP") {
                  const address = keys.rippleaddress;
                  const secret = keys.ripplesecret;
                  const payment = {
                    source: {
                      address: address,
                      maxAmount: {
                        value: assetupdatedata.transferamount.toString(),
                        currency: "XRP",
                      },
                    },
                    destination: {
                      address: assetupdatedata.receiveraddress,
                      tag: parseInt(sendertagid),
                      amount: {
                        value: assetupdatedata.transferamount.toString(),
                        currency: "XRP",
                      },
                    },
                  };
                  const instructions = { maxLedgerVersionOffset: 5 };
                  api.connect().then(() => {
                    console.log("Connected...");
                    return api
                      .preparePayment(address, payment, instructions)
                      .then((prepared) => {
                        console.log("Payment transaction prepared...");
                        const { signedTransaction } = api.sign(
                          prepared.txJSON,
                          secret
                        );
                        console.log("Payment transaction signed...");
                        api.submit(signedTransaction).then((result) => {
                          console.log(result);
                          if (
                            result &&
                            typeof result.tx_json != "undefined" &&
                            typeof result.tx_json.hash != "undefined"
                          ) {
                            var updateVal = {
                              transactionId: result.tx_json.hash,
                            };
                            RequestTable.findByIdAndUpdate(
                              { _id: ObjectId(req.body.id) },
                              updateVal,
                              { new: true },
                              function (err, assetupdatedata1) {
                                var useremail = assetupdatedata.userId.email;
                                var jsonfilter = {
                                  identifier: "Withdraw_notification",
                                };
                                Emailtemplates.findOne(
                                  jsonfilter,
                                  { _id: 0 },
                                  function (err, templates) {
                                    if (templates.content) {
                                      templateData = templates;
                                      templateData.content = templateData.content.replace(
                                        /##templateInfo_name##/g,
                                        useremail
                                      );
                                      templateData.content = templateData.content.replace(
                                        /##templateInfo_appName##/g,
                                        keys.siteName
                                      );
                                      templateData.content = templateData.content.replace(
                                        /##DATE##/g,
                                        new Date()
                                      );
                                      templateData.content = templateData.content.replace(
                                        /##AMOUNT##/g,
                                        parseFloat(
                                          assetupdatedata.transferamount
                                        ).toFixed(8)
                                      );
                                      templateData.content = templateData.content.replace(
                                        /##TXID##/g,
                                        result.tx_json.hash
                                      );
                                      templateData.content = templateData.content.replace(
                                        /##CURRENCY##/g,
                                        "XRP"
                                      );
                                      var smtpConfig = {
                                        // host: keys.host, // Amazon email SMTP hostname
                                        // auth: {
                                        //   user: keys.email,
                                        //   pass: keys.password,
                                        // },
                                        service: keys.serverName,
                                        auth: {
                                          user: keys.email,
                                          pass: keys.password,
                                        },
                                        host: keys.host,
                                        port: keys.port,
                                      };
                                      var transporter = nodemailer.createTransport(
                                        smtpConfig
                                      );

                                      var mailOptions = {
                                        from:
                                          keys.fromName +
                                          "<" +
                                          keys.fromemail +
                                          ">", // sender address
                                        to: useremail, // list of receivers
                                        subject: templateData.subject, // Subject line
                                        html: templateData.content, // html body
                                      };
                                      transporter.sendMail(
                                        mailOptions,
                                        function (error, info) {
                                          if (error) {
                                            return console.log(error);
                                          }
                                        }
                                      );
                                    }
                                  }
                                );
                                res.json({
                                  status: true,
                                  message:
                                    "Withdraw Request " + req.body.status,
                                });
                              }
                            );
                          }
                        });
                      });
                  });
                } else if (currency == "ETH") {
                  // var useraddress = keys.ethaddress;
                  // var userkey = keys.ethkey;
                  // var decrypted = CryptoJS.AES.decrypt(
                  //   userkey,
                  //   keys.cryptoPass
                  // );
                  // var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
                  // var userprivatekey = decryptedData.substring(2);
                  // userprivatekey = userprivatekey;
                  // web3.eth.getBalance(useraddress, (err, balance) => {
                  //   var balance = web3.utils.fromWei(balance, "ether");
                  //   var kjhkhkhkh = assetupdatedata.transferamount;
                  //   if (balance >= assetupdatedata.transferamount) {
                  //     var account1 = assetupdatedata.receiveraddress;
                  //     web3.eth.getGasPrice(function (err, getGasPrice) {
                  //       web3.eth.getTransactionCount(
                  //         useraddress,
                  //         (err, txCount) => {
                  //           var gaslimit = web3.utils.toHex(500000);
                  //           var fee = web3.utils.toHex(getGasPrice) * gaslimit;
                  //           // var amount = balance - fee;

                  //           if (kjhkhkhkh > 0) {
                  //             var updateVal = {};
                  //             // var userbal = web3.utils.fromWei(
                  //             //   balance.toString(),
                  //             //   "ether"
                  //             // );
                  //             // var amount = web3.utils.toWei(kjhkhkhkh.toString(),'hex');
                  //             var amount = web3.utils.toHex(
                  //               web3.utils.toWei(kjhkhkhkh.toString(), "ether")
                  //             );
                  //             console.log(amount, "amountamount");
                  //             const txObject = {
                  //               nonce: web3.utils.toHex(txCount),
                  //               gasLimit: web3.utils.toHex(gaslimit),
                  //               gasPrice: web3.utils.toHex(getGasPrice),
                  //               to: account1.toString(),
                  //               value: amount,
                  //             };

                  //             var userprivatekey1 = Buffer.from(
                  //               userprivatekey,
                  //               "hex"
                  //             );

                  //             // const tx = new Tx(txObject, { chain: "ropsten" });
                  //             const tx = new Tx(txObject, {
                  //               chain: "ropsten",
                  //               hardfork: "petersburg",
                  //             });
                  //             tx.sign(userprivatekey1);
                  //             const serializedTx = tx.serialize();
                  //             console.log(serializedTx);
                  //             const raw1 = "0x" + serializedTx.toString("hex");
                  //             console.log(raw1);
                  //             web3.eth.sendSignedTransaction(
                  //               raw1,
                  //               (err, txHash) => {
                  //                 console.log(txHash);
                  //                 console.log("Error in the transaction", err);
                  //                 var updateVal = { transactionId: txHash };
                  //                 RequestTable.findByIdAndUpdate(
                  //                   { _id: ObjectId(req.body.id) },
                  //                   updateVal,
                  //                   { new: true },
                  //                   function (err, assetupdatedata1) {
                  //                     var useremail =
                  //                       assetupdatedata.userId.email;
                  //                     var jsonfilter = {
                  //                       identifier: "Withdraw_notification",
                  //                     };
                  //                     Emailtemplates.findOne(
                  //                       jsonfilter,
                  //                       { _id: 0 },
                  //                       function (err, templates) {
                  //                         if (templates.content) {
                  //                           templateData = templates;
                  //                           templateData.content = templateData.content.replace(
                  //                             /##templateInfo_name##/g,
                  //                             useremail
                  //                           );
                  //                           templateData.content = templateData.content.replace(
                  //                             /##templateInfo_appName##/g,
                  //                             keys.siteName
                  //                           );
                  //                           templateData.content = templateData.content.replace(
                  //                             /##DATE##/g,
                  //                             new Date()
                  //                           );
                  //                           templateData.content = templateData.content.replace(
                  //                             /##AMOUNT##/g,
                  //                             parseFloat(
                  //                               assetupdatedata.transferamount
                  //                             ).toFixed(8)
                  //                           );
                  //                           templateData.content = templateData.content.replace(
                  //                             /##TXID##/g,
                  //                             txHash
                  //                           );
                  //                           templateData.content = templateData.content.replace(
                  //                             /##CURRENCY##/g,
                  //                             "ETH"
                  //                           );
                  //                           var smtpConfig = {
                  //                             // host: keys.host, // Amazon email SMTP hostname
                  //                             // auth: {
                  //                             //   user: keys.email,
                  //                             //   pass: keys.password,
                  //                             // },
                  //                             service: keys.serverName,
                  //                             auth: {
                  //                               user: keys.email,
                  //                               pass: keys.password,
                  //                             },
                  //                             host:keys.host,
                  //                             port:keys.port
                  //                           };
                  //                           var transporter = nodemailer.createTransport(
                  //                             smtpConfig
                  //                           );

                  //                           var mailOptions = {
                  //                             from:
                  //                               keys.fromName +
                  //                               "<" +
                  //                               keys.fromemail +
                  //                               ">", // sender address
                  //                             to: useremail, // list of receivers
                  //                             subject: templateData.subject, // Subject line
                  //                             html: templateData.content, // html body
                  //                           };
                  //                           transporter.sendMail(
                  //                             mailOptions,
                  //                             function (error, info) {
                  //                               if (error) {
                  //                                 return console.log(error);
                  //                               }
                  //                             }
                  //                           );
                  //                         }
                  //                       }
                  //                     );
                  //                     res.json({
                  //                       status: true,
                  //                       message:
                  //                         "Withdraw Request " + req.body.status,
                  //                     });
                  //                   }
                  //                 );
                  //               }
                  //             );
                  //           } else {
                  //             console.log("no balance");
                  //           }
                  //         }
                  //       );
                  //     });
                  //   } else {
                  //     res.json({ success: true, message: "Insuffient funds" });
                  //   }
                  // });

                  var useraddress = keys.ethaddress;
                  var userkey = keys.ethkey;
                  var receiveraddress = assetupdatedata.receiveraddress;
                  var decrypted = CryptoJS.AES.decrypt(
                    userkey,
                    keys.cryptoPass
                  );
                  var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
                  var userprivatekey = decryptedData.substring(2);
                  var transferamount = assetupdatedata.transferamount;
                  userprivatekey = userprivatekey;

                  var header = { "Content-Type": "application/json" };
                  var args = {
                    account1: assetupdatedata.receiveraddress,
                    cryptoPass: keys.cryptoPass,
                    adminaddress: useraddress,
                    privkey: userprivatekey,
                    amount: assetupdatedata.transferamount,
                    type: "sendtoaddress",
                  };

                  // var args = {
                  //   adminaddress: useraddress,
                  //   privkey: userprivatekey,
                  //   receiver: receiveraddress,
                  //   transferamount: transferamount,
                  //   type: "sendtoaddress",
                  // };

                  console.log(args, "args");
                  const options = {
                    url: "http://139.59.40.237:3003/ethnode",
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(args),
                  };
                  rp(options).then(function (body, response, test) {
                    console.log(body, "body");
                    var info = JSON.parse(body);
                    if (info.status) {
                      var updateVal = { transactionId: info.txHash };
                      RequestTable.findByIdAndUpdate(
                        { _id: ObjectId(req.body.id) },
                        updateVal,
                        { new: true },
                        function (err, assetupdatedata1) {
                          var useremail = assetupdatedata.userId.email;
                          var jsonfilter = {
                            identifier: "Withdraw_notification",
                          };
                          Emailtemplates.findOne(
                            jsonfilter,
                            { _id: 0 },
                            function (err, templates) {
                              if (templates.content) {
                                templateData = templates;
                                templateData.content = templateData.content.replace(
                                  /##templateInfo_name##/g,
                                  useremail
                                );
                                templateData.content = templateData.content.replace(
                                  /##templateInfo_appName##/g,
                                  keys.siteName
                                );
                                templateData.content = templateData.content.replace(
                                  /##DATE##/g,
                                  new Date()
                                );
                                templateData.content = templateData.content.replace(
                                  /##AMOUNT##/g,
                                  parseFloat(
                                    assetupdatedata.transferamount
                                  ).toFixed(8)
                                );
                                templateData.content = templateData.content.replace(
                                  /##TXID##/g,
                                  info.txHash
                                );
                                templateData.content = templateData.content.replace(
                                  /##CURRENCY##/g,
                                  "ETH"
                                );
                                var smtpConfig = {
                                  host: keys.host, // Amazon email SMTP hostname
                                  auth: {
                                    user: keys.email,
                                    pass: keys.password,
                                  },
                                };
                                var transporter = nodemailer.createTransport(
                                  smtpConfig
                                );

                                var mailOptions = {
                                  from:
                                    keys.fromName + "<" + keys.fromemail + ">", // sender address
                                  to: useremail, // list of receivers
                                  subject: templateData.subject, // Subject line
                                  html: templateData.content, // html body
                                };
                                transporter.sendMail(mailOptions, function (
                                  error,
                                  info
                                ) {
                                  if (error) {
                                    return console.log(error);
                                  }
                                });
                              }
                            }
                          );
                          res.json({
                            status: true,
                            message: "Withdraw Request " + req.body.status,
                          });
                        }
                      );
                    }
                  });
                }

                if (
                  currency == "BTC" ||
                  currency == "LTC" ||
                  currency == "BCH"
                ) {
                  var header = { "Content-Type": "application/json" };

                  var withdrawamount = assetupdatedata.transferamount;
                  var toaddress = assetupdatedata.receiveraddress;
                  var args = {
                    type: "sendtoaddress",
                    amount: withdrawamount,
                    address: toaddress,
                  };
                  // console.log(args);
                  var url =
                    currency == "BTC"
                      ? "http://139.59.15.4:3003/btcnode"
                      : currency == "LTC"
                      ? "http://159.65.145.118:3003/ltcnode"
                      : currency == "BCH"
                      ? "http://159.65.145.118:3000/bchnode"
                      : "";
                  const options = {
                    url: url,
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(args),
                  };
                  request(options, function (error, response, body) {
                    // console.log("error in sending transcation",error);
                    // console.log("body after tradnsferered",body)
                    if (!error && response.statusCode == 200) {
                      const info = JSON.parse(body);
                      console.log(info);
                      if (info.result) {
                        var updateVal = { transactionId: info.result };
                        RequestTable.findByIdAndUpdate(
                          { _id: ObjectId(req.body.id) },
                          updateVal,
                          { new: true },
                          function (err, assetupdatedata1) {
                            var useremail = assetupdatedata.userId.email;
                            var jsonfilter = {
                              identifier: "Withdraw_notification",
                            };
                            Emailtemplates.findOne(
                              jsonfilter,
                              { _id: 0 },
                              function (err, templates) {
                                if (templates.content) {
                                  templateData = templates;
                                  templateData.content = templateData.content.replace(
                                    /##templateInfo_name##/g,
                                    useremail
                                  );
                                  templateData.content = templateData.content.replace(
                                    /##templateInfo_appName##/g,
                                    keys.siteName
                                  );
                                  templateData.content = templateData.content.replace(
                                    /##DATE##/g,
                                    new Date()
                                  );
                                  templateData.content = templateData.content.replace(
                                    /##AMOUNT##/g,
                                    parseFloat(
                                      assetupdatedata.transferamount
                                    ).toFixed(8)
                                  );
                                  templateData.content = templateData.content.replace(
                                    /##TXID##/g,
                                    info.result
                                  );
                                  templateData.content = templateData.content.replace(
                                    /##CURRENCY##/g,
                                    currency
                                  );
                                  var smtpConfig = {
                                    // host: keys.host, // Amazon email SMTP hostname
                                    // auth: {
                                    //   user: keys.email,
                                    //   pass: keys.password,
                                    // },
                                    service: keys.serverName,
                                    auth: {
                                      user: keys.email,
                                      pass: keys.password,
                                    },
                                    host: keys.host,
                                    port: keys.port,
                                  };
                                  var transporter = nodemailer.createTransport(
                                    smtpConfig
                                  );

                                  var mailOptions = {
                                    from:
                                      keys.fromName +
                                      "<" +
                                      keys.fromemail +
                                      ">", // sender address
                                    to: useremail, // list of receivers
                                    subject: templateData.subject, // Subject line
                                    html: templateData.content, // html body
                                  };
                                  transporter.sendMail(mailOptions, function (
                                    error,
                                    info
                                  ) {
                                    if (error) {
                                      return console.log(error);
                                    }
                                  });
                                }
                              }
                            );
                            // res.json({ status: true, result: info.result });
                            res.json({
                              status: true,
                              message: "Withdraw Request " + req.body.status,
                            });
                          }
                        );
                      } else {
                        res.json({
                          status: false,
                          message: info.error.message,
                        });
                      }
                    } else {
                      res.json({ status: false, message: error.error.message });
                    }
                  });
                }
              }
            });
        } else {
          {
            res.json({
              status: true,
              message: "Withdraw Request " + req.body.status,
            });
          }
        }
      }
    }
  );
});

// router.post("/updatewithdraw", (req, res) => {
//   console.log(req.body, "req.body");
//   var updateVal = { status: req.body.status };
//   RequestTable.findByIdAndUpdate(
//     { _id: ObjectId(req.body.id) },
//     updateVal,
//     { new: true },
//     function (err, assetupdatedata) {
//       if (!err) {
//         if (req.body.status == "Confirmed") {
//           RequestTable.findOne({ _id: ObjectId(req.body.id) })
//             .populate({ path: "userId", select: "email" })
//             .then((assetupdatedata) => {
//               // RequestTable.findOne({_id:ObjectId(req.body.id)}).populate('receiveraddress').then(err,assetupdatedata => {
//               console.log("assetupdatedata",assetupdatedata);
//               if (assetupdatedata) {
//               if (assetupdatedata.cryptoType  == "ETH") {
//                   var useraddress = keys.ethaddress;
//                   var userkey = keys.ethkey;
//                   var decrypted = CryptoJS.AES.decrypt(
//                     userkey,
//                     keys.cryptoPass
//                   );
//                   var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
//                   var userprivatekey = decryptedData.substring(2);
//                   userprivatekey = userprivatekey;
//                   web3.eth.getBalance(useraddress, (err, balance) => {
//                     var balance = web3.utils.fromWei(balance, "ether");
//                     var kjhkhkhkh = assetupdatedata.transferamount;
//                     if (balance >= assetupdatedata.transferamount) {
//                       var account1 = assetupdatedata.receiveraddress;
//                       web3.eth.getGasPrice(function (err, getGasPrice) {
//                         web3.eth.getTransactionCount(
//                           useraddress,
//                           (err, txCount) => {
//                             var gaslimit = web3.utils.toHex(500000);
//                             var fee = web3.utils.toHex(getGasPrice) * gaslimit;
//                             // var amount = balance - fee;

//                             if (kjhkhkhkh > 0) {
//                               var updateVal = {};
//                               // var userbal = web3.utils.fromWei(
//                               //   balance.toString(),
//                               //   "ether"
//                               // );
//                               // var amount = web3.utils.toWei(kjhkhkhkh.toString(),'hex');
//                               var amount = web3.utils.toHex(
//                                 web3.utils.toWei(kjhkhkhkh.toString(), "ether")
//                               );
//                               console.log(amount, "amountamount");
//                               const txObject = {
//                                 nonce: web3.utils.toHex(txCount),
//                                 gasLimit: web3.utils.toHex(gaslimit),
//                                 gasPrice: web3.utils.toHex(getGasPrice),
//                                 to: account1.toString(),
//                                 value: amount,
//                               };

//                               var userprivatekey1 = Buffer.from(
//                                 userprivatekey,
//                                 "hex"
//                               );

//                               // const tx = new Tx(txObject, { chain: "ropsten" });
//                               const tx = new Tx(txObject, {
//                                 chain: "ropsten",
//                                 hardfork: "petersburg",
//                               });
//                               tx.sign(userprivatekey1);
//                               const serializedTx = tx.serialize();
//                               console.log(serializedTx);
//                               const raw1 = "0x" + serializedTx.toString("hex");
//                               console.log(raw1);
//                               web3.eth.sendSignedTransaction(
//                                 raw1,
//                                 (err, txHash) => {
//                                   console.log(txHash);
//                                   console.log("Error in the transaction",err);
//                                   var updateVal = { transactionId: txHash };
//                                   RequestTable.findByIdAndUpdate(
//                                     { _id: ObjectId(req.body.id) },
//                                     updateVal,
//                                     { new: true },
//                                     function (err, assetupdatedata1) {
//                                       var useremail =
//                                         assetupdatedata.userId.email;
//                                       var jsonfilter = {
//                                         identifier: "Withdraw_notification",
//                                       };
//                                       Emailtemplates.findOne(
//                                         jsonfilter,
//                                         { _id: 0 },
//                                         function (err, templates) {
//                                           if (templates.content) {
//                                             templateData = templates;
//                                             templateData.content = templateData.content.replace(
//                                               /##templateInfo_name##/g,
//                                               useremail
//                                             );
//                                             templateData.content = templateData.content.replace(
//                                               /##templateInfo_appName##/g,
//                                               keys.siteName
//                                             );
//                                             templateData.content = templateData.content.replace(
//                                               /##DATE##/g,
//                                               new Date()
//                                             );
//                                             templateData.content = templateData.content.replace(
//                                               /##AMOUNT##/g,
//                                               parseFloat(
//                                                 assetupdatedata.transferamount
//                                               ).toFixed(8)
//                                             );
//                                             templateData.content = templateData.content.replace(
//                                               /##TXID##/g,
//                                               txHash
//                                             );
//                                             templateData.content = templateData.content.replace(
//                                               /##CURRENCY##/g,
//                                               "ETH"
//                                             );
//                                             var smtpConfig = {
//                                               host: keys.host, // Amazon email SMTP hostname
//                                               auth: {
//                                                 user: keys.email,
//                                                 pass: keys.password,
//                                               },
//                                             };
//                                             var transporter = nodemailer.createTransport(
//                                               smtpConfig
//                                             );

//                                             var mailOptions = {
//                                               from:
//                                                 keys.fromName +
//                                                 "<" +
//                                                 keys.fromemail +
//                                                 ">", // sender address
//                                               to: useremail, // list of receivers
//                                               subject: templateData.subject, // Subject line
//                                               html: templateData.content, // html body
//                                             };
//                                             transporter.sendMail(
//                                               mailOptions,
//                                               function (error, info) {
//                                                 if (error) {
//                                                   return console.log(error);
//                                                 }
//                                               }
//                                             );
//                                           }
//                                         }
//                                       );
//                                       res.json({
//                                         status: true,
//                                         message:
//                                           "Withdraw Request " + req.body.status,
//                                       });
//                                     }
//                                   );
//                                 }
//                               );
//                             } else {
//                               console.log("no balance");
//                             }
//                           }
//                         );
//                       });
//                     } else {
//                       res.json({ success: true, message: "Insuffient funds" });
//                     }
//                   });
//                 }
//                 if (
//                   assetupdatedata.cryptoType  == "BTC" ||
//                   assetupdatedata.cryptoType == "LTC" ||
//                   assetupdatedata.cryptoType == "BCH"
//                 ) {
//                   var withdrawamount = assetupdatedata.transferamount;
//                   var toaddress = assetupdatedata.receiveraddress.address;
//                   var args = {
//                     type: "sendtoaddress",
//                     amount: withdrawamount,
//                     toaddress: toaddress,
//                   };
//                   console.log(args);
//                   var url =
//                     currency == "BTC"
//                       ? "http://157.230.0.110:3003/btcnode"
//                       : currency == "LTC"
//                       ? "http://165.227.84.53:3003/ltcnode"
//                       : currency == "BCH"
//                       ? "http://165.227.84.53:3003/bchnode"
//                       : "";
//                   const options = {
//                     url: url,
//                     method: "POST",
//                     headers: header,
//                     body: JSON.stringify(args),
//                   };
//                   request(options, function (error, response, body) {
//                     console.log(error);
//                     if (!error && response.statusCode == 200) {
//                       const info = JSON.parse(body);
//                       console.log(info);
//                       if (info.result) {
//                         var updateVal = { transactionId: info.result };
//                         RequestTable.findByIdAndUpdate(
//                           { _id: ObjectId(req.body.id) },
//                           updateVal,
//                           { new: true },
//                           function (err, assetupdatedata1) {
//                             var useremail = assetupdatedata.userId.email;
//                             var jsonfilter = {
//                               identifier: "Withdraw_notification",
//                             };
//                             Emailtemplates.findOne(
//                               jsonfilter,
//                               { _id: 0 },
//                               function (err, templates) {
//                                 if (templates.content) {
//                                   templateData = templates;
//                                   templateData.content = templateData.content.replace(
//                                     /##templateInfo_name##/g,
//                                     useremail
//                                   );
//                                   templateData.content = templateData.content.replace(
//                                     /##templateInfo_appName##/g,
//                                     keys.siteName
//                                   );
//                                   templateData.content = templateData.content.replace(
//                                     /##DATE##/g,
//                                     new Date()
//                                   );
//                                   templateData.content = templateData.content.replace(
//                                     /##AMOUNT##/g,
//                                     parseFloat(
//                                       assetupdatedata.transferamount
//                                     ).toFixed(8)
//                                   );
//                                   templateData.content = templateData.content.replace(
//                                     /##TXID##/g,
//                                     info.result
//                                   );
//                                   templateData.content = templateData.content.replace(
//                                     /##CURRENCY##/g,
//                                     currency
//                                   );
//                                   var smtpConfig = {
//                                     host: keys.host, // Amazon email SMTP hostname
//                                     auth: {
//                                       user: keys.email,
//                                       pass: keys.password,
//                                     },
//                                   };
//                                   var transporter = nodemailer.createTransport(
//                                     smtpConfig
//                                   );

//                                   var mailOptions = {
//                                     from:
//                                       keys.fromName +
//                                       "<" +
//                                       keys.fromemail +
//                                       ">", // sender address
//                                     to: useremail, // list of receivers
//                                     subject: templateData.subject, // Subject line
//                                     html: templateData.content, // html body
//                                   };
//                                   transporter.sendMail(mailOptions, function (
//                                     error,
//                                     info
//                                   ) {
//                                     if (error) {
//                                       return console.log(error);
//                                     }
//                                   });
//                                 }
//                               }
//                             );
//                             res.json({ status: true, result: info.result });
//                           }
//                         );
//                       } else {
//                         res.json({
//                           status: false,
//                           message: info.error.message,
//                         });
//                       }
//                     } else {
//                       res.json({ status: false, message: error.error.message });
//                     }
//                   });
//                 }
//               }
//             });
//         } else {
//           {
//             res.json({
//               status: true,
//               message: "Withdraw Request " + req.body.status,
//             });
//           }
//         }
//       }
//     }
//   );
// });

module.exports = router;
