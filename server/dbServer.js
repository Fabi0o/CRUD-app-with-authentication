const express = require("express");
const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

app.use(cors());

require("dotenv").config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});
db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected succesful:" + connection.threadId);
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
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM usersTable WHERE user = ?";
    const search_query = mysql.format(sqlSearch, [user]);
    const sqlInsert = "INSERT INTO usersTable VALUES (null,?,?,?,?,?,?)";
    const insert_query = mysql.format(sqlInsert, [
      user,
      hashedPassword,
      name,
      status,
      registerTime,
      lastLoginTime,
    ]);

    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      if (result.length != 0) {
        connection.release();
        console.log("------> User already exists");
        res.sendStatus(409);
      } else {
        await connection.query(insert_query, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("--------> Created new User");
          console.log(result.insertId);
          res.sendStatus(201);
        });
      }
    });
  });
});

app.post("/login", (req, res) => {
  const user = req.body.email;
  const password = req.body.password;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "Select * from usersTable where user = ?";
    const search_query = mysql.format(sqlSearch, [user]);
    await connection.query(search_query, async (err, result) => {
      connection.release();
      if (err) throw err;
      if (result.length == 0) {
        console.log("--------> User does not exist");
        res.sendStatus(404);
      } else if (result[0].status == "blocked") {
        console.log("--------> User blocked");
        res.sendStatus(404);
      } else {
        const hashedPassword = result[0].password;

        if (await bcrypt.compare(password, hashedPassword)) {
          console.log("---------> Login Successful");
          res.send(`${user} is logged in!`);
        } else {
          console.log("---------> Password Incorrect");
          res.sendStatus(404);
        }
      }
    });
  });
});
app.post("/update", (req, res) => {
  const value = req.body.value;
  const email = req.body.email;
  const column = req.body.column;
  const sqlUpdate = `UPDATE usersTable SET ${column}='${value}' WHERE (user = '${email}')`;
  const update_query = mysql.format(sqlUpdate);
  db.query(update_query, async (err, result) => {
    if (err) throw err;
    else {
      console.log("---------> Data Update Succesful!");
      res.status(201).send("saved");
    }
  });
});
app.get("/users", (req, res) => {
  db.query("SELECT * FROM usersTable", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/delete", (req, res) => {
  const id = req.body.id;
  const sqlUpdate = `DELETE FROM usersTable WHERE (id = ${id})`;
  const update_query = mysql.format(sqlUpdate);
  db.query(update_query, async (err, result) => {
    if (err) throw err;
    else {
      console.log("---------> Data Delete Succesful!");
      res.status(201).send("saved");
    }
  });
});
