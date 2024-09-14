const express = require("express");
const router = express.Router();
const Exam = require("../models/exam.model");
router.get('/exams', async(req,res,next)=>{
    try{

        const exams = await Exam.find();
        res.status(200).json({
            message: "Exams fetched successfully",
            exams: exams
        });
        console.log(exams)
    }
    catch(err){
        res.status(500).json({
            message: "Error fetching exams",
            error: err.message
        });
        next(err)
    }
})
module.exports = router;