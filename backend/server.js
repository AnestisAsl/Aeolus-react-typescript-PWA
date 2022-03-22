var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/aeolusDB");
mongoose.connection.once("open", function () {
  console.log("CONNECTION IS OK");
});
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

const PORT = 5000;

const userRouter = require("./routes/userRoutes");
app.use("/users", userRouter);
app.listen(5000, () => console.log(`SERVER STARTED ON PORT : ${PORT}`));
