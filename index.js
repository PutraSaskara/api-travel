const express = require('express');
const cors = require('cors');
// const authRoute = require('./routes/authRoutes.js'); // Import authentication route
const TourRoute = require('./routes/TourRoute.js');
const DescriptionRoute = require('./routes/DescriptionRoute.js');
const PlanRoute = require('./routes/PlanRoute.js');
const DetailRoute = require('./routes/DetailRoute.js');
const IncludeRoute = require('./routes/IncludeRoute.js');
const NotIncludeRoute = require('./routes/NotIncludeRoute.js');
const CancellationRoute = require('./routes/CancellationRoute.js');
const ImageRoute = require('./routes/ImageRoute.js');
const BlogRoute = require('./routes/SingleBlogRoute.js')
const BlogParagraf = require('./routes/BlogParagrafRoute.js')
const BlogImage = require('./routes/BlogImageRoute.js')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Use authentication route
// app.use(authRoute);

// Use other routes
app.use(TourRoute);
app.use(DescriptionRoute);
app.use(PlanRoute);
app.use(DetailRoute);
app.use(IncludeRoute);
app.use(NotIncludeRoute);
app.use(CancellationRoute);
app.use(ImageRoute);
app.use(BlogRoute);
app.use(BlogParagraf);
app.use(BlogImage);

app.listen(5000, () => console.log('Server up and running...'));
