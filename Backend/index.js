const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();


// App
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
require('./app/routes')(app);

// Port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});

// Database
const db = require("./app/models");
db.mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
