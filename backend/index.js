import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt"; //password hashing
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;
const salt = 10;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json()); //parses our data to jsonn format

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "auth-app",
});

app.get("/", (req, res) => {
  console.log("responsne");
});

// Register API
app.post("/register", (req, res) => {
  console.log(req.body);

  const sqlQuery =
    "INSERT INTO `user-login-main` (`name`, `emailid`, `password`)  VALUES (?);";

  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) {
      return res.status(500).json({ Error: "Error hasing the password" });
    } else {
      const values = [req?.body?.name, req?.body?.emailid, hash];

      db.query(sqlQuery, [values], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ Error: "Inserting data in DB error" });
        }
        return res.json({ status: "success" });
      });
    }
  });
});

// Login API
app.post("/login", (req, res) => {
  let sqlQuery = "SELECT * FROM `user-login-main` WHERE emailid = ?";

  db.query(sqlQuery, [req.body.emailid], (err, data) => {
    console.log(sqlQuery, req.body.emailid);
    if (err)
      return res.status(500).json({ Error: `Server side db error ${err}` });
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0]?.password, (err, response) => {
        if (err)
          return res.status(500).json({ Error: "Password compare error" });
        if (response) {
          const name = data[0]?.name;
          // Token generation
          const token = jwt.sign({ name }, "jwt-secret-key", {
            expiresIn: "1d",
          });

          // Adding the token in the cookies
          res.cookie("token", token);

          return res.status(200).json({ status: "Success" });
        } else {
          return res.status(401).json({ Error: "Incorrect password" });
        }
      });
    } else {
      res.status(404).json({ Error: "Email ID does not exist" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
