//IMPORT - FROM MODEL
const Subject = require('../models/subject.model');

//CREATE THE FUNCTION - TO SAVE THE SUBJECTS IN THE DATABASE
const createSubject = async(req, res) => {
    if(req.body) {
        const subject = new Subject(req.body);
        //save
        subject.save()
        .then(data => {
            //200/201 = SUCCESS STATUS
            res.status(200).send({data:data});
        })
         .catch(error => {
            res.status(500).send({ error: error.message});
        });
    }
}

//FUNCTION - GET THE SUBJECTS 
const getSubject = async (req, res) => {
    await Subject.find({ amount: {$lt: 3000}})
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }


//DELETE - RELATED TO THE ID
const deleteSubject = async(req, res) => {
  const id = req.params.id;

  Subject.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Subject was not found! Unsuccessful deletion of Subject with id=${id}.`
        });
      } else {
        res.send({
          message: "Successfully deleted the Subject!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Sorry! Cannot delete the Subject with id=" + id
      });
    });
};

//UPDATE - SPECIFIED TO THE ID
const updateSubject = async(req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data cannot be Empty for the Update!"
    });
  }

  const id = req.params.id;

  Subject.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Subject was not found! Unsuccessful updation of Subject with id=${id}.`
        });
      } else res.send({ message: "Successfully updated the Subject!" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Sorry! Cannot delete the Subject with id=" + id
      });
    });
};

//EXPORT
module.exports = {
    createSubject,
    getSubject,
    deleteSubject,
    updateSubject
};
