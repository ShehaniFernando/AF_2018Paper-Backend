//IMPORT THE DOWNLOADED FILES
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

//IMPORT
const subjectAPI = require('./src/api/subject.api');
const courseAPI = require('./src/api/course.api');

//CREATE THE CONFIGURATIONS
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//CREATE THE PORT NUMBER FOR THE BACKEND
const PORT = process.env.PORT || 8089;
const MONGODB_URI = process.env.MONGODB_URI;

//CONNECTION OPTIONS
mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
}, (error) => {
    if(error){
        console.log('Database Error: ', error.message);
    }
});

//IF CONNECTION IS SUCCESSFULLY OPENED
mongoose.connection.once('open', () =>{
    console.log('Database Synced');
});

//CREATE THE ROUTE TO CHECK WHETHER IF THE APP RUNS CORRECTLY IN THE BROWSER
app.route('/').get((req,res) => {
    res.send('SLIIT FINAL REVISE - 2018 PAST PAPER');
});

//REGISTER THE ENDPOINT INSIDE THE API
app.use('/subject', subjectAPI());
app.use('/course', courseAPI());

//START THE APP
app.listen(PORT, () =>{ 
    console.log(`Server is up and running on PORT ${PORT}`);
});