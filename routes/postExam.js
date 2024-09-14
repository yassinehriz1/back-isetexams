const express = require("express");
const router = express.Router();
const multer = require("multer");
const Exam = require("../models/exam.model");

// Configure storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Adjust path if needed
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ dest: 'uploads/' })

router.post('/newExam', upload.single('file'), async (req, res) => {
    try {
        
        const fileUrl = req.file ? req.file.path : null;

        const newExam = new Exam({
            examTitle: req.body.title,
            subject: req.body.subject,
            fileUrl: fileUrl 
        });

        const savedExam = await newExam.save();
        return res.status(201).json({
            message: "Exam created",
            exam: savedExam
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error creating exam",
            error: err.message
        });
    }
});

module.exports = router;
