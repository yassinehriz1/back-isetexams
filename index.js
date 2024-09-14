const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require("dotenv").config();
const allExamsRoute = require("./routes/allExams")
const postExamRoute = require("./routes/postExam")
const downloadExamRoute = require("./routes/downloadExam")


const app = express();
app.use(bodyParser.json())

const port = process.env.PORT;
const dbUrl = process.env.MONGODB_URI
const dataBase = mongoose.connection


;
//ROUTERS
app.use("/",allExamsRoute);
app.use("/",postExamRoute);
app.use("/",downloadExamRoute)



//CONNECTIONS

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
mongoose.connect(dbUrl)

dataBase.on('connected', () => { 
    console.log('Mongo Connected !')
})
dataBase.on('error', (err) => {
    console.log(err)
})


