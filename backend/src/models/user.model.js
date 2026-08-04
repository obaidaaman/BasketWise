import mongoose, { mongo } from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],

    },
    phoneNumber: {
        type: String,
        required: [false],
        min: 10,
        max: 10,
        unique: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })




const LocationSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },

        longitude: {
            type: Number,
            required: true
        }
    },

}, { timestamps: true })

const userModel = mongoose.model("users", UserSchema);

const locationModel = mongoose.model("address", LocationSchema);

export { userModel, locationModel }

