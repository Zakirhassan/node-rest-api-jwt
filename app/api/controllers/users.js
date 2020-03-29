const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
module.exports = {
 create: function(req, res, next) {
  
  userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
      if (err) 
       next(err);
      else{
       res.json({status: "success", message: "User added successfully!!!", data:null});
      }
      
    });
 },
authenticate: async function(req, res, next) {
  try{
 await userModel.findOne({email:req.body.email}, function(err, userInfo){
    console.log("a",req.body.email,"b")
    if(err){
        console.log("one",err) 
        next(err);  
    }
    
     if(userInfo) {
        console.log("elseeee");
       
        if(bcrypt.compareSync(req.body.password, userInfo.password)) {
        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
        //res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
let transporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'zakirhassan114@gmail.com', 
        pass: '--------------------YOUR PASSWORD-------------------'
    } 
});
var mailOptions = { from: 'zakirhassan114@gmail.com', to: req.body.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/users/\afterauthenticate\/' };
transporter.sendMail(mailOptions, function (err) {
    if (err) { return res.status(500).send({ msg: err.message }); }
    res.status(200).send('A verification email has been sent to ' + req.body.email + '.');
});
}else{
res.json({status:"error", message: "Invalid email/password!!!", data:null});
}
     }
    });
  }
  catch(err){console.log("catch error")}
 },
 login: function(req,res,next){

 }
}