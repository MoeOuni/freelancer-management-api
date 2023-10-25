const requestModel = require("../models/requestModel");

exports.saveRequest = async (req, res) => {
    try {
        // Create a new request.
        const request = new requestModel({
            ...req.body
        });

        // Save the new request to database.
        await request.save();

        // Return a response to the client.
        res.status(200).json({
            request,
            message: "Your request has been saved successfully. We will respond to you shortly."
        })
    } catch (error) {
        // Catch unhandled errors and send them to client.
        res.status(500).json({
            ...error
        })
    }
}



