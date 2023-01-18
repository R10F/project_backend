const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
require("dotenv").config();

const mongoString = process.env.DB_URL;
// const devRoutes = require('./app/routes/sampleData');
// const route = require('./app/routes/routes');
const route = require('./app/routes/index');

const database = require("./app/models");
database.mongoose.connect(mongoString);
const db = database.mongoose.connection;
db.on('error', (err) => {
    console.log(err);
})
db.once('connected', () => {
    console.log('Database connected');
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
app.get("/", (req, res) => {
  res.json({message: "Welcome"});
});
app.use('/', route);
// require('./app/routes/sampleData')(app);
// require('./app/routes/routes')(app);