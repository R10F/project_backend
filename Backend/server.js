require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;

const devRoutes = require("./routes/sample-data");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});

app.use("/dev", devRoutes);
