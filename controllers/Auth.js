
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();


// SignUp

exports.signup = async(req, res) => {
    try{
        // fetch data from req body
        const {
            fullName,
            userName,
            dateOfBirth,
            gender,
            country,
            password,
            confirmPassword,
        } = req.body;

        // Validation 
        if(!fullName || !userName || !dateOfBirth || !gender || !country
             || !password || !confirmPassword) {
                return res.status(401).json({
                    success:false,
                    message:"All fields are required",
                })
            }

        // matching of password and confirm passowrd
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirmpassword  does not Match, Plese try again ",
            });
        }

        // check user already exist or not

        const existingUser = await User.findOne({userName});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already registered",
            });
        }
    
        // hash password
        const hashedPassword =  await bcrypt.hash(password, 10);

        // Storing data in database
        const user =  await User.create({
            fullName,
            userName,
            gender,
            dateOfBirth,
            country,
            password:hashedPassword,
        })


        // return response
        return res.status(200).json({
            success:true,
            message:"Signup Successfull, Please login",
            data:user,
        })

    } catch(error){
        console.log("Error during the signup",error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered,Please try again",
        })
    }
}


// login
exports.login = async(req, res) => {
    try{
        // get data from req body
        const {userName, password} = req.body;

        // validation of data
        if(!userName || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required ,please try again",
            });
        }

        // user check exist or not 
        const user =  await User.findOne({userName});
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered ,Please signup first",
            });
        }

        // generate Jwt, after password matching 
    if(await bcrypt.compare(password, user.password)){

        const payload = {
            userName:user.userName,
            id:user._id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        user.token = token;
        user.password = undefined;

        // create cookie and send response
        

        const options = {
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token", token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Logged In successfully",
        })
    }else{
        return res.status(401).json({
            success:false,
            message:"Password Incorrect",
        });
    }
    }catch(error){
        console.log("Error during the login ",error);
        return res.status(500).json({
            success:false,
            message:"Login Failure ,Please try again",
        });
    }
}


