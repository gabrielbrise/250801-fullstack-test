import express from "express";
import cors from "cors";
import { getEmployment } from "./controllers/Employment";

const app = express();
const port = 3000;

app.use(cors()); // <-- Allow all origins for dev

app.get("/", (_req, res) => {
  res.send("Hello from Node.js + TypeScript!");
});

app.get("/employment", getEmployment);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
