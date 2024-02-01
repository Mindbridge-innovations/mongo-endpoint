require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to MongoDB using environment variables
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Define a schema for your interactions
const interactionSchema = new mongoose.Schema({
  objectName: String,
  interactionType: String,
  timestamp: Date,
  // Add other fields as necessary
});

// Create a model based on the schema
const Interaction = mongoose.model('Interaction', interactionSchema);

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Define POST endpoint to handle interactions
app.post('/api/interactions', (req, res) => {
  const interactionData = req.body;
  // Add validation for interactionData here
  const interaction = new Interaction(interactionData);

  // Save interaction to the database
  interaction.save()
    .then(() => res.status(200).send('Interaction logged'))
    .catch(err => {
      console.error('Error logging interaction:', err);
      res.status(500).send('Error logging interaction');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});