import { locationModel } from "../models/user.model.js"

export async function getLocationController(req, res) {
    try {
        let location = await locationModel.findOne({
            userId: req.user.id
        });

        if (!location) {
            return res.status(404).json({
                "message": "Location not found. Please enable location services."
            })

        }

        const latitude = location.location.latitude;
        const longitude = location.location.longitude;

        return res.status(200).json({
            latitude,
            longitude
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong. Please Try again later",
            error: error.message
        })
    }
}


export async function locationController(req, res) {
    try {
        const userId = req.user.id;
        const { location } = req.body;

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
        const update = await locationModel.findOneAndUpdate(
            {
                userId
            },
            {
                $set: {
                    location
                }
            },
            {
                upsert: true,
                new: true,
                runValidators: true
            }

        );


        return res.status(200).json({
            message: "Location Updated successfully",
            data: update
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}