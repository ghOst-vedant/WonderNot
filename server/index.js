const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");

// db connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Not connected", err));
const app = express();
const port = 8000;

// middle
app.use(express.json());

app.use("/", require("./routes/authRouters"));
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
