//API ENDPOINT
//IMPORT
const express = require('express');
const router = express.Router();
const controller = require('../controllers/subject.controller');

//EXPORT
module.exports = function(){
    router.post('/create', controller.createSubject);
    router.get('/', controller.getSubject);
    router.delete("/:id", controller.deleteSubject);
    router.put("/:id", controller.updateSubject);
    return router;
}

