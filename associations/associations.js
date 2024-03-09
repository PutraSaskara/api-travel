const Tour = require("../models/TourModel")
const Plan = require('../models/PlanModel')
const Include = require('../models/IncludeMode')
const NotInclude = require('../models/NotIncludeModel')
const Image = require('../models/ImageModel')
const Detail = require('../models/DetailModel.js')
const Description = require('../models/DescriptionModel.js')
const Cancellation = require('../models/CancellationModel.js')


Tour.hasMany(Detail);
Tour.hasMany(Plan);
Tour.hasMany(Description);
Tour.hasMany(Include);
Tour.hasMany(NotInclude);
Tour.hasMany(Cancellation);
Tour.hasMany(Image);