import userModel from "../models/user.model.js";
import crypto from "crypto";
import dotenv from "dotenv";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";
import { ref } from "process";
import { use } from "react";
import { error } from "console";
export async function signUp(req,res){
    try{
        const {username, email, password} = req.body;
    const existingUser = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
     })

    if(existingUser){
        return res.status(409).json({
            message : "User already exists",

        })

    }

    const hashPasword = crypto.createHash("sha256").update(password).digest("hex");


    

  
   const user = await userModel.create({
    username,
    email,
    password: hashPasword
    });
    const accessToken = jwt.sign({
        id : user._id,
        username : username,
        email : email
    }, process.env.JWT_SECRET,
    {expiresIn: "15m"})



    const refreshToken = jwt.sign({
        id : user._id,
        username : username,
        email : email
    }, process.env.JWT_SECRET,
    {expiresIn: "7d"})    

    res.cookie("refreshToken", refreshToken,{
        httpOnly : true,
        secure : false,
        sameSite : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })



    return res.status(201).json({
        token : accessToken,
        message : "User created successfully",
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    })
    } catch (err) {
        res.status(500).json({
            error : err.message,
            message : "Something went wrong"
            
        })
    }
}

export function me(req,res){

    return res.json({
        user:req.user
    });

}

export async function refresh(req,res) {
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken)
        if(!refreshToken){
            return res.status(404).json({
                message : "Token not Found"
            })


        }

        const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
        const accessToken = jwt.sign({
            id : decoded.id,
            username : decoded.username,
            email : decoded.email
        },config.JWT_SECRET,
    {
        expiresIn : "15m"
    });
        const newRefreshToken = jwt.sign({
        id : decoded._id,
        username : decoded.username,
        email : decoded.email
    }, process.env.JWT_SECRET,
    {expiresIn: "7d"})
    
    
        res.cookie("refreshToken", newRefreshToken,{
        httpOnly : true,
        secure : true,
        sameSite : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
        res.status(200).json({
            message : "Access token refreshed",
            accessToken : accessToken
        })

}

export async function login(req,res){
 try{
 const {email, password} = req.body;


   const existingUser = await userModel.findOne({
       email
   })
   if (!existingUser){
    return res.status(409).json({
        message: "Invalid email or password."
    })
   }

   const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

   if(hashedPassword !== existingUser.password){
    return res.status(401).json({
        message : "Invalid email or password"
    });
   }

   const accessToken = jwt.sign({
    id : existingUser._id,
    username : existingUser.username,
    email : existingUser.email
   }, config.JWT_SECRET,{
    expiresIn : "15m"
   })

   const refreshToken = jwt.sign({
    id : existingUser._id,
    username : existingUser.username,
    email : existingUser.email
   }, config.JWT_SECRET,{
    expiresIn : "7d"
   })

   res.cookie("refreshToken", refreshToken,{
    httpOnly: true,
    secure: false, 
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
   })

    return res.status(200).json({
            message : "User logged in Successfully",
            token : accessToken,
            data : {
                id : existingUser._id,
                username: existingUser.username,
        email: existingUser.email
            }
        })
 }   catch(err){
        res.status(500).json({
            message : "Something went wrong",
            error : err.message
        })
 }
}