//IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

//MODEL CLASS SCHEMA
const CourseSchema = new mongoose.Schema({
    name: {type:String, required:true, trim:true},
    code: {type:String, required:true, trim:true},
    passmark: {type:String, required:true},
    lecture: {type:String, required:true, trim:true},

    //MANY TO MANY RELATIONSHIP - GIVE REFERENCE TO COURSE COLLECTION
    subjects: [{type: mongoose.Schema.Types.ObjectId, required:false, ref:'subjects'}]
});

//SAVE TO THE DATABASE
const Course = mongoose.model('courses', CourseSchema);

//EXPORT - IMPORTED IN THE CONTROLLER
module.exports = Course;