const express = require('express');
const app = express();
const studentRoute = express.Router();

//Student model
let Student = require('../model/Student');


//Add Student
studentRoute.route('/add-student').post((req, resp, next) =>{
    Student.create(req.body, (error, data) =>{
        if (error){
            return next(error)
        } else {
            resp.json(data)
        }
    })
});

//Get all students
studentRoute.route('/').get((req, res) => {
    Student.find((error, data) => {
        if(error){
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//Get one student
studentRoute.route('/read-student/:id').get((req, res) => {
    Student.findById(req.params.id, (error, data) => {
        if(error){
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//update student
studentRoute.route('/update-student/:id').put((req, res, next) =>{
    Student.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data)=>{
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Student successfully updated!');
        }
    })
})

//Delete Student
studentRoute.route('/delete-student/:id').delete((req, res, next)=>{
    Student.findByIdAndRemove(req.params.id, (error, data) => {
        if (error){
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })

})

module.exports = studentRoute;
