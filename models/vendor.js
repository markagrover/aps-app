const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    state: {type: String, required: "Must Pick a State"},
    city: {type: String, required: "Must Choose a Town or City"},
    zipcode: {type: String, required: "Must Enter ZipCode"},
    street:{type: String, required: "Must Enter Street"},
    houseNumber:{type: String, required: "Must Enter House Number"},
});

const vendorSchema = new mongoose.Schema({
    company: {type: String, required:"Must Enter Company Name" },
    phone: {
        type: String,
        required: [true, "phone can not be blank!"]
    },
    email: {
        type: String,
        required: [true, "Email can not be blank!"]
    },
    address: {type: addressSchema},
    website: {
        type: String,/*belongs to todo*/
        required: [true, "Name can not be blank!"]
    },
    active: {
        type: Boolean,
        default: true
    },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
