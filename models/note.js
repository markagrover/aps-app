const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    createdOn: {type: Date, default: Date.now},
    details: { type: String},
    job:  { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }
})

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
