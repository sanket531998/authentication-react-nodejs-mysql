import express from "express";
import mysql from "mysql";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("responsne");
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
