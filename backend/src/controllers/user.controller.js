import config from "../config/config.js";
import jwt from "jsonwebtoken";
import {locationModel} from "../models/user.model.js"



export async function locationController(req, res) {
    try{
        const userId = req.user.id;
        const {location} = req.body;

        if (
    !location ||
    location.latitude === undefined ||
    location.longitude === undefined
) {
    return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required."
    });
}
       const update=  await locationModel.findOneAndUpdate(
            {
            userId
        },
        {
            $set: {
                location
            }
        },
        {
            upsert : true,
            new: true,
            runValidators : true
        }
    
    );

    
        return res.status(200).json({
            message : "Location Updated successfully",
            data : update
        });
    

    }catch(error){
        return res.status(500).json({
    success: false,
    message: error.message
});
    }
    
}