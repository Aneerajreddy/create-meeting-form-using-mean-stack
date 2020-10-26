const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let Meeting = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    section: {
        type: String
    },
    subjects: {
        type: Array
    },
    date: {
        type: Date
    }
}, {
    collection: 'meetings'
})

module.exports = mongoose.model('Meeting', Meeting)