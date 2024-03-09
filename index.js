const express = require("express");
const cors = require("cors");
const UserRoute = require("./routes/TourRoute.js");
require('./associations/associations.js')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(UserRoute);

app.listen(5000, ()=> console.log('Server up and running...'));
