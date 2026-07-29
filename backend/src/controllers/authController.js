import userModel from "../models/user.model.js";
import crypto from "crypto";
const users= [];


export function signUp(req,res){
    const {username, email, password} = req.body;
    const existingUser = userModel.findOne({
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


    

    // users.push(user);
   const user = userModel.create({
    username,
    email,
    password: hashPasword
    });

    
    return res.status(201).json({
        message : "User created successfully",
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    })
}



export function login(req,res){
    const {email, password} = req.body;

    if(!(users.find(user => user.email == email))){
        return res.status(404).json({
            message :"User Not found, Invalid email or password"
        })
    }

    return res.status(200).json({
            message : "User logged in Successfully",
            token : "[YOUR_TOKEN_HERE]"
        })
}