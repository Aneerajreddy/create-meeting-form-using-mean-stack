const express = require('express');
const app = express();
const MeetingRoute = express.Router();

// meeting model
let Meeting = require('../model/meeting');

// Add meeting
MeetingRoute.route('/add-meeting').post((req, res, next) => {
    Meeting.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all meetings
MeetingRoute.route('/').get((req, res) => {
    Meeting.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single meeting
MeetingRoute.route('/read-meeting/:id').get((req, res) => {
    Meeting.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update meeting
MeetingRoute.route('/update-meeting/:id').put((req, res, next) => {
    Meeting.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Meeting successfully updated!')
        }
    })
})

// Delete meeting
MeetingRoute.route('/delete-meeting/:id').delete((req, res, next) => {
    Meeting.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = MeetingRoute;