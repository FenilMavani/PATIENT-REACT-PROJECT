import React, { useState } from 'react';
import "./App.css"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function FrontEnd() {
    const [name,setName] = useState("");
    const [dob, setdob] = useState("");
    const [gender,setgender] = useState("");
    const [allergic, setallergic] = useState("Yes");
    const [tid, settid] = useState("");
    const [pid, setpid] = useState("");
    const [type, settype] = useState("");
    const [category, setcategory] = useState("");
    const [startDate, setstartDate] = useState("");
    const [prescription, setprescription] = useState("Yes");
    const [lists,setlists] = useState([]);
    const [searchbar,setsearchbar] = useState("");

    // fetchRecord function for getting data from server and displaying it in frontend
    function fetchRecord() {
        axios.get('http://localhost:8028/data')
        .then((response) => {
            setlists(response.data);
        });
    }
    //saveTreatment function is used to save new treatment value to server database
    function saveTreatment(){
       axios.post("http://localhost:8028/treatments",{
           tid:tid,
           pid:pid,
           category:category,
           type:type,
           startDate:startDate,
           prescription:prescription,
       }).then(()=> {
           console.log("Treatment Saved");
       });
    }

    //savePatient function is used to save new treatment value to server database
    function savePatient() {
    axios.post('http://localhost:8028/patients',{
        pid:pid,
        name:name,
        dob:dob,
        gender:gender,
        allergic:allergic
    })
    .then (() => {
        console.log("Patient Saved");
    });
    }

    //deletePatient function is used to delete patient information
    function deletePatient() {
        axios.delete(`http://localhost:8028/deletePatient/${pid}`)
        .then(() => {
            console.log("Patient deleted");
        })
    }
    
    //deleteTreatment function is used to delete treatment information
    function deleteTreatment() {
        axios.delete(`http://localhost:8028/deleteTreatment/${tid}`)
        .then(() => {
        console.log("Treatment deleted");
        })
    }

    //updatePatient function is used to update patient information
    function updatePatient() {
        axios.put(`http://localhost:8028/updatePatients/${pid}`,{
        pid:pid,
        name:name,
        dob:dob,
        gender:gender,
        allergic:allergic
        }).then(()=> {
            console.log("Patient updated");
        })
    }

    //updateTreatment function is used to update treatment information
    function updateTreatment() {
        axios.put(`http://localhost:8028/updateTreatments/${tid}`,{
        tid:tid,
        pid:pid,
        category:category,
        type:type,
        startDate:startDate,
        prescription:prescription
        }).then(()=> {
            console.log("Treatment updated");
        })
    }


    function saveDatas(){
        console.log("success");
        saveTreatment();
        savePatient();
    }
    function seeData(){
        console.log("success");
        fetchRecord();
    }
    function deleteData() {
        console.log("success");
        deletePatient();
        deleteTreatment();

    }
    function updateData() {
        console.log("success");
        updatePatient();
        updateTreatment();
    }

    return (
    <body class = "data">
    <div>
        <div class = "head">
            <h1>LH Medical Company (LHM)</h1>
            <h2>Patient Form</h2>
        </div>
        <div class = "data">
        <div className="container mt-4">
        <div  class="row mb-2">
        <label class="col-sm-3 col-form-label" style={{fontWeight:"bold"}}>Patient ID</label>
        <div class="col-sm-3">
        <input type="text"  placeholder='Patient ID' onChange={event => {setpid(event.target.value)}} class="form-control"/> <br/>
        </div>
        </div>
        <div  class="row mb-2">
        <label class="col-sm-3 col-form-label" style={{fontWeight:"bold"}}> Treatment ID </label>
        <div class="col-sm-3">
        <input type="text" placeholder='Treatment ID' onChange={event => {settid(event.target.value)}} class="form-control"/> <br/>
        </div>
        </div>
        <div  class="row mb-2">
        <label class="col-sm-3 col-form-label" style={{fontWeight:"bold"}}> Name of Patient</label>
        <div class="col-sm-3">
        <input type="text" placeholder='Patient Name' onChange={event => {setName(event.target.value)}} class="form-control"/> <br/>
        </div>
        </div>
        <div  class="row mb-2">
        <label class="col-sm-3 col-form-label" style={{fontWeight:"bold"}}>Date of Birth</label>
        <div class="col-sm-3">
        <input placeholder='DOB' type="date" onChange={event => {setdob(event.target.value)}} class="form-control"/> <br/>
        </div>
        </div>
        <div  class="row mb-2">
        <label class="col-sm-3 col-form-label" style={{fontWeight:"bold"}}>Gender of Patient</label>
        <div class="col-sm-3">
        <input type="text" placeholder='Gender' onChange={event => {setgender(event.target.value)}} class="form-control"/> <br/>
        </div>
        </div>
        <div  class="row mb-2">
        <label class="col-sm-3 col-form-label" style={{fontWeight:"bold"}}>Allergic</label>
        <div class="col-sm-3">
        <select class="form-select form-select "  id="allergic" onChange={event => {setallergic(event.target.value)}}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        </select> <br/>
        </div>
        </div>
        <div  class="row mb-2">
        <label class="col-sm-3 col-form-label" style={{fontWeight:"bold"}}>Treatment Category</label>
        <div class="col-sm-3">
        <input type="text" placeholder='Category' onChange={event => {setcategory(event.target.value)}} class="form-control"/> <br/>
        </div>
        </div>
        <div  class="row mb-2">
        <label class="col-sm-3 col-form-label" style={{fontWeight:"bold"}}>Treatment Type</label>
        <div class="col-sm-3">
        <input type="text" placeholder='Type' onChange={event => {settype(event.target.value)}} class="form-control"/> <br/>
        </div>
        </div>
        <div  class="row mb-2">
        <label class="col-sm-3 col-form-label" style={{fontWeight:"bold"}}>Treatment Start Date</label>
        <div class="col-sm-3">
        <input type="date" onChange={event => {setstartDate(event.target.value)}} class="form-control"/> <br/>
        </div>
        </div>
        <div  class="row mb-2">
        <label class="col-sm-3 col-form-label"style={{fontWeight:"bold"}} >Prescription Given</label>
        <div class="col-sm-3">
        <select class="form-select form-select"  id="prescription" onChange={event => {setprescription(event.target.value)}}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        </select> <br/>
        </div>
        </div>
        <button class="btn btn-secondary btn-lg"  onClick={saveDatas} disabled =  {!(pid && tid )} > Add Patient</button> &nbsp;&nbsp;
        <button class="btn btn-secondary btn-lg"  onClick={seeData} >See Patient</button>&nbsp;&nbsp;
        <button class="btn btn-secondary btn-lg"  onClick={updateData} disabled =  {!(pid && tid )}> Update Details</button>&nbsp;&nbsp;
        <button class="btn btn-secondary btn-lg"  onClick={deleteData} disabled =  {!(pid && tid )}>Delete Details</button>
        </div>

        <br/> <br/>

        
        <div className="container mt-4">
        <div class="col-sm-5">
        <h1>Filter by Category</h1>
        <input class="form-control"  placeholder='Enter Category' onChange={e => {setsearchbar(e.target.value)}}/>  <br/> <br/>
        </div>

        
        
        {lists.filter((props) => {
        if (searchbar == "") {
            return props
        } else if (props.CATEGORY.toLowerCase().includes(searchbar.toLowerCase())) {
            return props
        }
        }).map((props) =>{
        return (
        <div>
            <table class = "table table-dark">
            <thead>
                <tr>
                    <th scope='col'> PATIENT ID </th>
                    <th scope='col'> TREATMENT ID </th>
                    <th scope='col'> NAMES</th>
                    <th scope='col'> DATE OF BIRTH </th>
                    <th scope='col'> GENDER </th>
                    <th scope='col'> TREATMENT CATEGORY </th>
                    <th scope='col'> TREATMENT TYPE </th>
                    <th scope='col'> START DATE </th>
                    <th scope='col'> PRESCRIPTION </th>
                    <th scope='col'> ALLERGIC </th>
                </tr>
                <tr>
                    <th scope='col'> {props.PID} </th>
                    <th scope='col'> {props.TID} </th>
                    <th scope='col'> {props.NAME}</th>
                    <th scope='col'> {props.DOB}</th>
                    <th scope='col'> {props.GENDER} </th>
                    <th scope='col'>{props.CATEGORY} </th>
                    <th scope='col'> {props.TYPE} </th>
                    <th scope='col'> {props.START_DATE} </th>
                    {props.PRESCRIPTION.toLowerCase() == "yes" && (<th scope='col' style={{color: "green", fontWeight:"bold"}}> {props.PRESCRIPTION} </th>)}
                    {props.PRESCRIPTION.toLowerCase() == "no" && (<th scope='col'> {props.PRESCRIPTION} </th>)}
                    {props.ALLERGIC.toLowerCase()== "yes" && (<th scope='col'style={{color: "red", fontWeight:"bold"}}> {props.ALLERGIC}</th>)}
                    {props.ALLERGIC.toLowerCase() == "no" && (<th scope='col'> {props.ALLERGIC} </th>)}
                </tr>
            </thead>
            </table> <br/>

        </div>
        );
        })}
        </div>
        </div>
    </div>
    </body>
    )
}

export default FrontEnd;
