let mongoose = require('mongoose');
let aggregatePaginate = require('mongoose-aggregate-paginate-v2');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    author: String,
    subject: String,
    grade: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    remarks: String
});

AssignmentSchema.plugin(aggregatePaginate)

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
