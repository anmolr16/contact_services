var express = require('express');
var router = express.Router();
var support = require('../utility');
var contact = require('../model/contactModel');

router.get('/', (request, response) => (response.send('contact services working fine')));

router.post('/createContact', (request, response) => {
    try {
        var data = request.body;
        console.log(data);
        if (data) {
            var newContact = new contact(data);
            newContact.save((error, result) => {
                if (error) {
                    console.log("Error");
                    console.log(error);
                    support.error(response, error);
                } else {
                    console.log("Success");
                    console.log("Contact created successfully.");
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

router.get('/getContacts', (request, response) => {
    try {
        contact.find((error, result) => {
            if (error) {
                console.log("Error");
                console.log(error);
                support.error(response, error);
            } else {
                console.log("Success");
                console.log("Contacts listed successfully.");
                support.success(response, result);
            }
        });
    } catch (e) {
        console.log("Bad Request");
        console.log(e);
        support.badRequest(response);
    }
});


router.get('/getContactByName', (request, response) => {
    try {
        var name = request.query.name;
        if (checkEmpty(name)) {
            console.log("Invalid Data");
            support.invalidData(response);
        }
        contact.findOne({ 'name': name }, (error, result) => {
            if (error) {
                console.log("Error");
                console.log(error);
                support.error(response, error);
            } else {
                console.log("Success");
                console.log("Contact listed successfully.");
                support.success(response, result);
            }
        });
    } catch (error) {
        console.log("Bad Request");
        console.log(e);
        support.badRequest(response);
    }
});

module.exports = router;