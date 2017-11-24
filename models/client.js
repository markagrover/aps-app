const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    state: {type: String, required: "Must Pick a State"},
    city: {type: String, required: "Must Choose a Town or City"},
    zipcode: {type: String, require: "Must Enter ZipCode"},
    street:{type: String, require: "Must Enter Street"},
    houseNumber:{type: String, require: "Must Enter House Number"},
});

const clientSchema = new mongoose.Schema({
    fName: {
        type: String,
        require: "First Name can not be blank!"
    },
    lName: {
        type: String,
        required: [true, "Last Name can not be blank!"]
    },
    phone: {
        type: String,
        require: [true, "phone can not be blank!"]
    },
    email: {
        type: String,
        required: [true, "Email can not be blank!"]
    },
    address: {type: addressSchema},
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    completed: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
