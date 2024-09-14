const express = require("express")
const router = express.Router()
const Exam = require("../models/exam.model");
const path = require("path");

router.delete("/exams/:id", async (req, res) => {

    try {
        const exam = await Exam.findById(req.params.id);
        
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }
        await Exam.deleteOne({ _id: req.params.id })
        .then(()=>{
            console.log("Exam deleted")
            res.send("Exam deleted")
        })
        

    } catch (err) {
        res.status(500).json({
            message: "Error deleting file",
            error: err.message
        });
    }
})

module.exports = router;