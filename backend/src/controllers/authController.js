import { userModel } from "../models/user.model.js";
import crypto from "crypto";

import config from "../config/config.js";
import jwt from "jsonwebtoken";

import sessionModel from "../models/session.model.js";


function createHash(stringToConvert) {
    return crypto.createHash("sha256").update(stringToConvert).digest("hex");
}

export async function signUp(req, res) {
    try {
        const { username, email, password } = req.body;
        const existingUser = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",

            })

        }

        const hashPasword = createHash(password);





        const user = await userModel.create({
            username,
            email,
            password: hashPasword
        });

        const refreshToken = jwt.sign({
            id: user._id,
            username: username,
            email: email
        }, config.JWT_SECRET,
            { expiresIn: "7d" })
        const refreshTokenHash = createHash(refreshToken);

        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash: refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        })




        const accessToken = jwt.sign({
            id: user._id,
            sessionId: session._id,
            username: username,
            email: email
        }, config.JWT_SECRET,
            { expiresIn: "15m" })






        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })



        return res.status(201).json({
            token: accessToken,
            message: "User created successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: "Something went wrong"

        })
    }
}

export function me(req, res) {

    return res.json({
        user: req.user
    });

}

export async function refresh(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken)
        if (!refreshToken) {
            return res.status(404).json({
                message: "Token not Found"
            })


        }

        const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
        const refreshTokenHash = createHash(refreshToken);

        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        })
        if (!session) {
            return res.status(401).json({
                message: "Invalid refresh token"
            })
        }

        const accessToken = jwt.sign({
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
        }, config.JWT_SECRET,
            {
                expiresIn: "15m"
            });
        const newRefreshToken = jwt.sign({
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
        }, config.JWT_SECRET,
            { expiresIn: "7d" })
        const newRefreshtokenHash = createHash(newRefreshToken);
        session.refreshTokenHash = newRefreshtokenHash;
        await session.save();

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            message: "Access token refreshed",
            accessToken: accessToken
        })
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }

}

export async function login(req, res) {
    try {
        const { email, password } = req.body;


        const existingUser = await userModel.findOne({
            email
        })
        if (!existingUser) {
            return res.status(409).json({
                message: "Invalid email or password."
            })
        }

        const hashedPassword = createHash(password);

        if (hashedPassword !== existingUser.password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const refreshToken = jwt.sign({
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email
        }, config.JWT_SECRET, {
            expiresIn: "7d"
        })
        const refreshTokenHash = createHash(refreshToken);

        await sessionModel.create({
            user: existingUser._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        })

        const accessToken = jwt.sign({
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email
        }, config.JWT_SECRET, {
            expiresIn: "15m"
        })


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "User logged in Successfully",
            token: accessToken,
            data: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email
            }
        })
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}


export async function logout(req, res) {

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(404).json({
            message: "Refresh Token Not found"
        })

    }

    const refreshTokenHash = createHash(refreshToken);
    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })
    if (!session) {
        return res.status(404).json({
            message: "Refresh Token Not found"
        })
    }

    session.revoked = true;
    await session.save();
    res.clearCookie("refreshToken")

    res.status(200).json({
        message: "Logged out successfully"
    })
}