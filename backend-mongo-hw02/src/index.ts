import cors = require("cors");
import express = require("express");
import morgan = require("morgan");
import { createConnection } from "typeorm";
import { Attendance } from "./entity/Attendance";
import attendanceRoutes from "./routes/attendance.routes";

const app = express();

// connection settings are in the "ormconfig.json" file
createConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use(attendanceRoutes);

app.listen(3000);
console.log("Server on port", 3000);
