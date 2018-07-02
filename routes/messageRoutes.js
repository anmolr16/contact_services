var express = require('express');
var router = express.Router();
var support = require('../utility');
var message = require('../model/messageModel');

router.get('/', (request, response) => (response.send('Message services working fine')));

router.post('/createMessage', (request, response) => {
    try {
        var data = request.body;
        console.log(data);
        if (data) {
            data.sentAt = new Date();
            var newmessage = new message(data);
            newmessage.save((error, result) => {
                if (error) {
                    console.log("Error");
                    console.log(error);
                    support.error(response, error);
                } else {
                    console.log("Success");
                    console.log("Message details saved successfully.");
                    support.success(response, result);
                }
            });
        } else {
            console.log("invalid data");
            support.invalidData(response);
        }
    } catch (e) {
        console.log("Bad Request");
        console.log(e);
        support.badRequest(response);
    }
});

router.get('/getMessages', (request, response) => {
    try {
        message.find({}, { __v: 0 })
            .sort('-sentAt')
            .exec((error, result) => {
                if (error) {
                    console.log("Error");
                    console.log(error);
                    support.error(response, error);
                } else {
                    console.log("Success");
                    console.log("Messages listed successfully.");
                    support.success(response, result);
                }
            });
    } catch (e) {
        console.log("Bad Request");
        console.log(e);
        support.badRequest(response);
    }
});


module.exports = router;