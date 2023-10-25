const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    library: [
        String,
    ],
    link: {
        type: String,
    },
    livePreview: {
        type: String,
    }
})

const projectModel = mongoose.model("project", projectSchema);

module.exports = projectModel;