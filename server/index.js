const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
 const app = express();
 const mysql = require('mysql');



 const db = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CK2DODataBase',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/get', (req, res)=> {
    const sqlSelect = 
    "SELECT * FROM task2do_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {
    const task2doName =req.body.movieName;
    const task2doReview = req.body.movieReview;

    const sqlInsert = 
    "INSERT INTO task2do_reviews (task2doName, task2doReview) VALUES (?,?)";
  db.query(sqlInsert, [task2doName, task2doReview], (err,result) => {
      console.log(result);

  });
});

app.delete("/api/delete/:task2doName", (req, res) => {
    const name = req.params.task2doName;
    const sqlDelete = "DELETE FROM task2do_reviews WHERE task2doName = ?";
  
    db.query(sqlDelete, name, (err, result) => {
      if (err) console.log(err);
    });
  
  });

  app.put("/api/update", (req, res) => {
    const name = req.body.task2doName;
    const review = req.body.task2doReview;
    const sqlUpdate = "UPDATE task2do_reviews SET task2doReview =? WHERE task2doName = ?";
  
    db.query(sqlUpdate, [review, name], (err, result) => {
      if (err) console.log(err);
    });
  
  });



app.listen(3001, () => {
    console.log("running on port 3001");
});
