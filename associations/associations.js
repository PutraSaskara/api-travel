const Tour = require("../models/TourModel")
const Plan = require('../models/PlanModel')
const Include = require('../models/IncludeMode')
const NotInclude = require('../models/NotIncludeModel')
const Image = require('../models/ImageModel')
const Detail = require('../models/DetailModel.js')
const Description = require('../models/DescriptionModel.js')
const Cancellation = require('../models/CancellationModel.js')


Tour.hasOne(Detail, { foreignKey: 'tourId' });
Tour.hasOne(Plan, { foreignKey: 'tourId' });
Tour.hasOne(Description, { foreignKey: 'tourId' });
Tour.hasOne(Include, { foreignKey: 'tourId' });
Tour.hasOne(NotInclude, { foreignKey: 'tourId' });
Tour.hasOne(Cancellation, { foreignKey: 'tourId' });
Tour.hasOne(Image, { foreignKey: 'tourId' });