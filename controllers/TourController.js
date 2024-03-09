const fs = require('fs');
const Tour = require("../models/TourModel.js");
const Plan = require('../models/PlanModel.js')
const Include = require('../models/IncludeMode.js')
const NotInclude = require('../models/NotIncludeModel.js')
const Image = require('../models/ImageModel.js')
const Detail = require('../models/DetailModel.js')
const Description = require('../models/DescriptionModel.js')
const Cancellation = require('../models/CancellationModel.js')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.getTours = async function (req, res) {
    try {
        const tours = await Tour.findAll();
        res.status(200).json(tours);
    } catch (error) {
        console.error("Error getting tours:", error.message);
        res.status(500).json({ error: "Could not retrieve tours" });
    }
};

exports.getTourById = async function (req, res) {
    try {
      const tourId = req.params.id;
      const tour = await Tour.findByPk(tourId, {
        include: [
          { model: Detail },
          { model: Plan },
          { model: Description },
          { model: Include },
          { model: NotInclude },
          { model: Cancellation },
          { model: Image },
        ]
      });
  
      if (!tour) {
        return res.status(404).json({ error: 'Tour not found' });
      }
  
      // Format the response
      const response = {
        id: tour.id,
        title: tour.title,
        price: tour.price,
        detail: tour.Details,
        'tour_plan': tour.TourPlans,
        'tour-description': tour.TourDescriptions,
        included: tour.Includeds,
        'not-included': tour.NotIncludeds,
        cancellation: tour.Cancellations,
        image: tour.Images,
        createdAt: tour.createdAt,
        updatedAt: tour.updatedAt
      };
  
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

exports.updateTour = async function (req, res) {
    try {
        const { id } = req.params;
        let tour = await Tour.findByPk(id);
        if (!tour) {
            return res.status(404).json({ error: "Tour not found" });
        }
        const { title, price } = req.body;

        await tour.update({
            title,
            price
            // Add other fields to update
        });

        tour = await Tour.findByPk(id);
        res.status(200).json(tour);
    } catch (error) {
        console.error("Error updating tour:", error.message);
        res.status(400).json({ error: "Could not update tour" });
    }
};

exports.deleteTour = async function (req, res) {
    try {
        const { id } = req.params;
        const tour = await Tour.findByPk(id);
        if (!tour) {
            return res.status(404).json({ error: "Tour not found" });
        }
        await tour.destroy();
        res.status(200).json({ message: "Tour deleted successfully" });
    } catch (error) {
        console.error("Error deleting tour:", error.message);
        res.status(500).json({ error: "Could not delete tour" });
    }
};

exports.createTour = async function (req, res) {
    try {
        const { title, price } = req.body;
        const newTour = await Tour.create({
            title,
            price
            // Add other fields here
        });
        res.status(201).json(newTour);
    } catch (error) {
        console.error("Error creating tour:", error.message);
        res.status(400).json({ error: error.message });
    }
};
