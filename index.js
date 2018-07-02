var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
global._ = require('lodash');

//------- Gloabl functions
global.checkEmpty = function(arg) {
    if (typeof(arg) == 'undefined' || arg == null || arg == '') {
        return true;
    } else {
        return false;
    }
};

process.on('uncaughtException', function(err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});

mongoose.connect('mongodb://localhost:27017/contact')
    .then(() => { // if all is ok we will be here
        console.log('Connected to db');

        //------- Create App
        var app = express();

        //------- Handle CORS
        app.use(cors());
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Methods", "*");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        //------- Body parser
        app.use(bodyParser.text());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        //-- -- -- - Routes
        app.use('/contact', require('./routes/contactRoutes'));
        app.use('/message', require('./routes/messageRoutes'));

        var port = process.env.PORT || 9090;
        app.listen(port, function() {
            console.log("Server listening at " + port);
        });


    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });