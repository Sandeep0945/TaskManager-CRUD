const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user.model.js")

// Signup

const signup = async (req,res)=>{
    try{
        const { name , email , password } = req.body;

        const existUser = await User.findOne({ email });

        if(existUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        // Hash the password 

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password : hashedPassword
        })

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "Sign Up Successfully",
            user: userResponse
        })
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

// Login

const login = async(req,res)=>{
    try{
        const { email , password } = req.body;
        
        const user = await User.findOne({ email });
        
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }
        
        // Check user password with database password
        
        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        const createToken = (userId) => {
            return jwt.sign(
                { id: userId },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
        };
        
        const userResponse = user.toObject();
        delete userResponse.password;
        
        const token = createToken(user._id);

        res.status(201).json({
            message: "Login Successfully",
            user: userResponse,
            token: token
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    signup,
    login
}