//IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

//MODEL CLASS SCHEMA
const SubjectSchema = new mongoose.Schema({
    name: {type:String, required:true, trim:true},
    description: {type:String, required:true, trim:true},
    amount: {type:Number, required:true},

    //MANY TO MANY RELATIONSHIP - GIVE REFERENCE TO COURSE COLLECTION
    courses: [{type: mongoose.Schema.Types.ObjectId, required:false, ref:'courses'}]
});

//SAVE TO THE DATABASE
const Subject = mongoose.model('subjects', SubjectSchema);

//EXPORT - IMPORTED IN THE CONTROLLER
module.exports = Subject;