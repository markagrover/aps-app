const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    state: {type: String, required: "Must Pick a State"},
    city: {type: String, required: "Must Choose a Town or City"},
    zipcode: {type: Number, require: "Must Enter ZipCode"},
    street:{type: String, require: "Must Enter Street"},
    houseNumber:{type: String, require: "Must Enter House Number"},
});

const jobSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Job Type can not be blank!"]
    },
    address: {
        type: addressSchema
    },
    startDate: {
        type: String
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    completed: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
