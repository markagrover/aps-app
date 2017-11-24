const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({
    first: {
        type: String,
        required: [true, "First Name Required!"]
    },
    last: {
        type: String,
        required: [true, "Last Name Required!"]
    }
});

module.exports = nameSchema;
