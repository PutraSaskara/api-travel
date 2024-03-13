const express = require("express");
const cors = require("cors");
const TourRoute = require("./routes/TourRoute.js");
const DescriptionRoute = require("./routes/DescriptionRoute.js");
const PlanRoute = require("./routes/PlanRoute.js");
const DetailRoute = require("./routes/DetailRoute.js");
const IncludeRoute = require("./routes/IncludeRoute.js");
const NotIncludeRoute = require("./routes/NotIncludeRoute.js");
const CancellationRoute = require("./routes/CancellationRoute.js");
const ImageRoute = require("./routes/ImageRoute.js");
// require('./associations/associations.js')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(TourRoute);
app.use(DescriptionRoute);
app.use(PlanRoute);
app.use(DetailRoute);
app.use(IncludeRoute);
app.use(NotIncludeRoute);
app.use(CancellationRoute);
app.use(ImageRoute);
app.listen(5000, ()=> console.log('Server up and running...'));
