require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

//My ROUTES
const studentRoutes = require("./routes/student");

//MiddleWares
app.use(express.json());
app.use(cors());

//Routes:
app.use("/api/v1/", studentRoutes);

const port = process.env.PORT || 8000;

mongoose
  .set("strictQuery", true)
  .connect(process.env.DATABASE)
  .then((val) => {
    console.log("DB connected successfully");
    app.listen(port, () => {
      console.log(`App is running at port ${port}`);
    });
  })
  .catch((err) => console.log(err));
