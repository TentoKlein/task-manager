const express = require("express");
const cors = require("cors");

const app = express();   // ✅ MUST come before app.use()

app.use(cors());         // ✅ now correct
app.use(express.json());

// your routes here
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

module.exports = app;