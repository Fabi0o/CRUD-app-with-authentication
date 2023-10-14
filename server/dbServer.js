const express = require("express");
const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

app.use(cors());

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server Started on port ${port}...`));

app.use(express.json());

app.post("/createUser", async (req, res) => {
  const user = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const name = req.body.name;
  const status = req.body.status;
  const registerTime = req.body.registerTime;
  const lastLoginTime = req.body.lastLoginTime;
  const sqlSearch = "SELECT * FROM usersTable WHERE user = ?";
  const search_query = mysql.format(sqlSearch, [user]);

  pool.query(
    `SELECT * FROM userstable WHERE "user" = '${user}'`,
    (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.rows.length);
      if (result.rows.length != 0) {
        console.log("------> User already exists");
        res.sendStatus(409);
      } else {
        pool.query(
          'INSERT INTO usersTable ("user", password, name, status, registerTime, lastLoginTime) VALUES ($1,$2,$3,$4,$5,$6)',
          [user, hashedPassword, name, status, registerTime, lastLoginTime],
          (err, result) => {
            if (err) throw err;
            console.log("--------> Created new User");
            console.log(result.insertId);
            res.sendStatus(201);
          }
        );
      }
    }
  );
});

// app.post("/login", (req, res) => {
//   const user = req.body.email;
//   const password = req.body.password;
//   db.getConnection(async (err, connection) => {
//     if (err) throw err;
//     const sqlSearch = "Select * from usersTable where user = ?";
//     const search_query = mysql.format(sqlSearch, [user]);
//     connection.query(search_query, async (err, result) => {
//       connection.release();
//       if (err) throw err;
//       if (result.length == 0) {
//         console.log("--------> User does not exist");
//         res.sendStatus(404);
//       } else if (result[0].status == "blocked") {
//         console.log("--------> User blocked");
//         res.sendStatus(404);
//       } else {
//         const hashedPassword = result[0].password;

//         if (await bcrypt.compare(password, hashedPassword)) {
//           console.log("---------> Login Successful");
//           res.send(`${user} is logged in!`);
//         } else {
//           console.log("---------> Password Incorrect");
//           res.sendStatus(404);
//         }
//       }
//     });
//   });
// });
// app.post("/update", (req, res) => {
//   const value = req.body.value;
//   const email = req.body.email;
//   const column = req.body.column;
//   const sqlUpdate = `UPDATE usersTable SET ${column}='${value}' WHERE (user = '${email}')`;
//   const update_query = mysql.format(sqlUpdate);
//   db.query(update_query, (err, result) => {
//     if (err) throw err;
//     else {
//       console.log("---------> Data Update Succesful!");
//       res.status(201).send("saved");
//     }
//   });
// });

app.get("/users", (req, res) => {
  pool.query("SELECT * FROM usersTable", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// app.post("/delete", (req, res) => {
//   const id = req.body.id;
//   const sqlUpdate = `DELETE FROM usersTable WHERE (id = ${id})`;
//   const update_query = mysql.format(sqlUpdate);
//   db.query(update_query, (err, result) => {
//     if (err) throw err;
//     else {
//       console.log("---------> Data Delete Succesful!");
//       res.status(201).send("saved");
//     }
//   });
// });
