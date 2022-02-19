var sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('record.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err
    }
    console.log('Connected to the record databse.')
});

const sql1 = 'CREATE TABLE PATIENT (PID INTEGER PRIMARY KEY, NAME TEXT, DOB TEXT, GENDER TEXT, ALLERGIC TEXT)';
db.run(sql1, (err) => {
    if (err) {
        // Table already created
        console.log('Table already created.');
    }
    else{
      console.log('Table created.');

      // First time Table created, insert some rows
      console.log('First time Table created, creating some rows.');
      var insert1 = 'INSERT INTO PATIENT (PID, NAME, DOB, GENDER, ALLERGIC) VALUES (?,?,?,?,?)';
      db.run(insert1, [1,'James','2000-02-12','Male', 'Yes']);
      db.run(insert1, [2,'Michael','1995-11-17','Female', 'No']);
      db.run(insert1, [3,'Amy','1990-06-13','Female', 'No']);
      db.run(insert1, [4,'Fred','2012-08-12','Male', 'No']);
      db.run(insert1, [5,'Emily','2005-11-27','Male', 'Yes']);
    }
});

const sql = ' CREATE TABLE TREATMENT (PID integer, TID TEXT PRIMARY KEY, CATEGORY TEXT, TYPE TEXT, START_DATE TEXT, PRESCRIPTION TEXT, FOREIGN KEY (PID) REFERENCES PATIENT(PID))'
db.run(sql, (err) => {
    if (err) {
        // Table already created
        console.log('Table already created.');
    }
    else{
      console.log('Table created.');

      // First time Table created, insert some rows
      console.log('First time Table created, creating some rows.');

      var insert = 'INSERT INTO TREATMENT (PID, TID, CATEGORY, TYPE, START_DATE, PRESCRIPTION) VALUES (?,?,?,?,?,?)';
      db.run(insert, [1,'T1234', 'Knee Treatment','Knee Replacement','2021-02-12','Yes']);
      db.run(insert, [1,'T1235', 'Knee Treatment','Knee Tapping','2015-10-02','No']);
      db.run(insert, [2,'T1236', 'Cancer Treatment','Radiation Therapy','2009-08-23','Yes']);
      db.run(insert, [3,'T1237', 'Cancer Treatment','Surgical oncology','2012-04-05','No']);
      db.run(insert, [4,'T1238', 'Gene therapy','Cambiogenplasmid','2011-11-11','No']);
      db.run(insert, [5,'T1239', 'Acne treatments','Light therapy','2010-10-03','Yes']);
    }
});

module.exports = db;
