const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async(req,res)=>{

try{

const {name,email,password} = req.body;

if(!name || !email || !password){
    return res.status(400).json({
        message:"All fields required"
    });
}

const userExist = await User.findOne({email});

if(userExist){
    return res.status(400).json({
        message:"User already exists"
    });
}

const hashedPassword =
await bcrypt.hash(password,10);

const user = await User.create({
    name,
    email,
    password:hashedPassword
});

// res.status(201).json({
//     success:true,
//     user
// });
res.redirect("/login");

}catch(error){

    res.status(500).json({
        message:error.message
    });
}
};

exports.loginUser = async(req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
    return res.status(400).json({
        message:"Invalid Email"
    });
}

const isMatch =
await bcrypt.compare(
password,
user.password
);

if(!isMatch){

return res.status(400).json({
message:"Invalid Password"
});
}

const token = jwt.sign(
{
id:user._id,
email:user.email
},
process.env.JWTSecret,
{
expiresIn:"1d"
}
);

res.cookie("token", token, {
httpOnly:true
});

res.redirect("/dashboard");

// res.status(200).json({
// success:true,
// token
// });

}catch(error){

res.status(500).json({
message:error.message
});
}
};

exports.logoutUser = (req,res)=>{

res.clearCookie("token");

res.status(200).json({
success:true,
message:"Logout Successful"
});
};