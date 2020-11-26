// Comment
// Import dependancies 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Comment
// Import User model
const User = require('../models/user');

// Comment
// Handling post-request
router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(
            result => {
                if (result.length >= 1)
                    return res.status(409).json({
                        conflct: {
                            message: 'The email does already exist',
                        }
                    });
                // Comment
                // In case witch everything is Ok
                // if the email doesn't exist
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err)
                        return res.status(500).json({
                            error: {
                                message: err.message
                            }
                        });
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                        .then(
                            result => {
                                console.log(result)
                                res.status(200).json({
                                    status: 200,
                                    message: 'User Successfully created',
                                    result: {
                                        email : result.email,
                                        password : result.password
                                    }
                                })
                            }
                        )
                        .catch(
                            err => {
                                errorFunction(res, err);
                            }
                        );
                });
            }
        )
});


// Comment
// Building an error function
function errorFunction(res, err) {
    console.log(err);
    res.status(500).json({
        error: {
            status: 500,
            message: err.message
        }
    });
}

// Comment
// Export module
module.exports = router;