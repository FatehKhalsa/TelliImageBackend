const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageUploader = new Schema({
    image_description: {
        type: String
    },
    image_file: {
        type: String
    }
});

module.exports = mongoose.model('imageUploader', imageUploader);