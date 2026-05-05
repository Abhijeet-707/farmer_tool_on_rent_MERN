const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const dboperations = require('./queries/dboperations.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Root connection check
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Auth Routes
app.post('/api/register', dboperations.registerUser);
app.post('/api/login', dboperations.loginUser);
app.post('/api/admin/login', dboperations.adminLogin);

// Tools Routes
app.get('/api/tools', dboperations.getAllTools);
app.post('/api/tools', dboperations.addTool);
app.put('/api/tools/:id', dboperations.updateTool);
app.delete('/api/tools/:id', dboperations.deleteTool);

// Bookings Routes
app.get('/api/bookings', dboperations.getAllBookings);
app.get('/api/bookings/user/:id', dboperations.getFarmerBookings);
app.post('/api/bookings', dboperations.createBooking);
app.put('/api/bookings/:id/status', dboperations.updateBookingStatus);
app.delete('/api/bookings/:id', dboperations.deleteBooking);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
