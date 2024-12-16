import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt"; //password hashing
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;
const salt = 10;

app.use(cors());
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
app.get("/login", (req, res) => {
  let sqlQuery;
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
