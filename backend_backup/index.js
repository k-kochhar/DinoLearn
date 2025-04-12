const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

require('dotenv').config();


const roadmapRoutes = require("./routes/roadmapRoutes");
const lessonRoutes = require("./routes/lessonRoutes");

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/lessons", lessonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
