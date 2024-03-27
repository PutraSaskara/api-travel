// controllers/bookingController.js

const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendBookingRequest = async (req, res) => {
  const { name, email, dates, guests, note, tour } = req.body;

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'trasas881@gmail.com', // Your Gmail email address
        pass: process.env.VARIABLE_PASSWORD // Your Gmail password (Use environment variables in production)
      }
    });

    // Email message
    const mailOptions = {
      from: 'trasas881@gmail.com', // Sender address
      to: 'putrasaskara@yahoo.com', // Destination email address
      subject: 'New Booking Request', // Email subject
      text: `Name: ${name}\nEmail: ${email}\nDates: ${dates}\nNumber of Guests: ${guests}\nNote: ${note}\nTour: ${tour}` // Email body 
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send('Booking request sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('An error occurred while sending the booking request.');
  }
};
