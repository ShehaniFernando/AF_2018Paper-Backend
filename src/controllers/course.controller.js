//IMPORT - FROM MODEL
const Course = require('../models/course.model');

//CREATE THE FUNCTION - TO SAVE THE COURSES IN THE DATABASE
const createCourse = async(req, res) => {
    if(req.body) {
        const course = new Course(req.body);
        //SAVE - RETURNS A PROMISE
        //AWAIT
        await course.save()
        .then(data => {
            //200/201 = SUCCESS STATUS
            res.status(200).send({data:data});
        })
         .catch(error => {
            res.status(500).send({ error: error.message});
        });
    }
}

//CREATE THE FUNCTION - TO GET ALL THE COURSES
const getAllCourses = async(req,res) => {
    await Course.find({}).populate('subjects', 'name description amount')
    .then(data => {
        //200/201 = SUCCESS STATUS
        res.status(200).send({data:data});
    })
     .catch(error => {
        res.status(500).send({ error: error.message});
    });
}

//CREATE THE FUNCTION - RETURN THE SUBJECTS WHEN THE COURSE IS GIVEN
const getSubjectsForCourse = async(req, res) => {
    if(req.params && req.params.id) {
        await Course.findById(req.params.id)
        .populate('subjects', 'name description amount')
        .then(data => {
            //200/201 = SUCCESS STATUS
            res.status(200).send({subjects:data.subjects});
        })
        .catch(error => {
            res.status(500).send({ error: error.message});
        });

    }
}

//CALCULATION
const calculateAmount = async (req, res) => {
    if (req.params && req.params.id) {
      const course = await Course.findById(req.params.id).populate('subjects', 'amount')
      let totalAmount = 0;

      console.log(course.subject)

      if (course.subjects.length > 0) {
        course.subjects.map((subject) => {
          totalAmount += subject.amount;
          console.log(totalAmount)
        });
      }
      res.status(200).send({ totalAmount: totalAmount });
    }
  }

//EXPORT
module.exports = {
    createCourse,
    getAllCourses,
    getSubjectsForCourse,
    calculateAmount
};
