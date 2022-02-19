var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser")
var db = require("./database.js");
const { statSync } = require('fs');
const { all } = require('proxy-addr');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8028;

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT));
});

app.get("/", (req,res, next) => {
    res.json({"message":"Ok"})
});
// for getting data from databse posting it to /data port and send it to front end for display
app.get("/data", (req, res) => {
    console.log("SELECT Treatment");
    db.all("SELECT PATIENT.PID, TID , NAME, DOB, GENDER, CATEGORY, TYPE, START_DATE, ALLERGIC, PRESCRIPTION from PATIENT INNER JOIN TREATMENT ON TREATMENT.PID = PATIENT.PID ORDER BY PATIENT.PID", (err, result) => {
      if (err) {
        console.log(err);
      }else {
        res.send(result);
      }
    });
});


// it is used to insert new treatment which we get frontend form
app.post("/treatments",(req,res) => {
    const pid = req.body.pid;
    const tid = req.body.tid;
    const category = req.body.category;
    const type = req.body.type;
    const startDate = req.body.startDate;
    const prescription = req.body.prescription;
    db.run("INSERT INTO TREATMENT (PID, TID, CATEGORY, TYPE, START_DATE, PRESCRIPTION) VALUES (?,?,?,?,?,?)",
    [pid,tid,category,type,startDate,prescription],
    (err,result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Value inserted");
        }
    });
});

// it is used to insert new patient which we get frontend form
app.post("/patients",(req,res) => {
    const pid = req.body.pid;
    const name = req.body.name;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const allergic = req.body.allergic;
    db.run("INSERT INTO PATIENT (PID, NAME, DOB, GENDER, ALLERGIC) VALUES (?,?,?,?,?)",
    [pid,name,dob,gender,allergic],
    (err,result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Value inserted");
        }
    });
});


// it is used to delete patient record
app.delete("/deletePatient/:pid", (req, res, next) => {

    console.log("DELETE Patient:" + req.params.pid);

    db.run(
        'DELETE FROM PATIENT WHERE PID = ?',
        req.params.pid,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
});

//it is used to delete treatment records
app.delete("/deleteTreatment/:tid", (req, res, next) => {

    console.log("DELETE Treatment:" + req.params.tid);

    db.run(
        'DELETE FROM TREATMENT WHERE TID = ?',
        req.params.tid,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
});


// it is used to update patient data in the patient table
app.put("/updatePatients/:pid", (req,res) => {
    const pid = req.body.pid;
    const name = req.body.name;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const allergic = req.body.allergic;
    console.log("Update Patient" +req.params.pid)
    db.run(
        " UPDATE PATIENT SET PID = COALESCE(?,PID), NAME = COALESCE(?,NAME),  DOB = COALESCE(?,DOB),  GENDER = COALESCE(?,GENDER),ALLERGIC = COALESCE(?,ALLERGIC) WHERE PID = ?"
        ,[pid,name,dob,gender,allergic,req.params.pid],
            (err,result) => {
                if(err) {
                    console.log(err);
                } else {
                    res.send("Value UPDATED");
                }
            });
});

// it is used to update treatment data in the treatment table
app.put("/updateTreatments/:tid", (req,res) => {
    const pid = req.body.pid;
    const tid = req.body.tid;
    const category = req.body.category;
    const type = req.body.type;
    const startDate = req.body.startDate;
    const prescription = req.body.prescription;
    console.log("Update Treatment" +req.params.tid)
    db.run(
        "UPDATE TREATMENT SET PID = COALESCE(?,PID), TID = COALESCE(?,TID),CATEGORY = COALESCE(?,CATEGORY),TYPE = COALESCE(?,TYPE), START_DATE = COALESCE(?,START_DATE),PRESCRIPTION = COALESCE(?,PRESCRIPTION) WHERE TID = ?"
        ,[pid,tid,category,type,startDate,prescription,req.params.tid],
            (err,result) => {
                if(err) {
                    console.log(err);
                } else {
                    res.send("Value UPDATED");
                }
            });
});
