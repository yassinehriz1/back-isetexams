const express = require("express");
const router = express.Router();
const Exam = require("../models/exam.model");
const path = require("path");

router.get('/exams/:id', async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        const filePath = path.resolve(exam.fileUrl);

        res.download(filePath, (err) => {
            if (err) {
                console.log("Error in downloading the file: ", err);
                return res.status(500).send({
                    message: "Error downloading the file"
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            message: "Error downloading file",
            error: err.message
        });
    }
});

module.exports = router;
