const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const selectStatement = "SELECT * FROM movie_reviews;";
  db.query(selectStatement, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const moviename = req.body.movieName;
  const review = req.body.moviereview;
  const insertStatement =
    "INSERT INTO movie_reviews (movie_name,movie_review) VALUES(?,?);";
  db.query(insertStatement, [moviename, review], (err, result) => {
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running server on 3001");
});
