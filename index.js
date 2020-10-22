const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const imageLoaderRoutes = express.Router();
const PORT = 4000;

let imageModel = require('./image.model');


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/imageLoader', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

imageLoaderRoutes.route('/').get(function(req, res) {
    imageModel.find(function(err, images) {
        if (err) {
            console.log(err);
        } else {
            res.json(images);
        }
    });
});

imageLoaderRoutes.route('/add').post(function(req, res) {
    let image = new imageModel(req.body);
    image.save()
        .then(image => {
            res.status(200).json({'image': 'image added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new image failed');
        });
});

app.use('/images', imageLoaderRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
