const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    object: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String
    },
});

const requestModel = mongoose.model("request", requestSchema);

module.exports = requestModel;