const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/vrInteractions', { useNewUrlParser: true, useUnifiedTopology: true });


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
app.use(bodyParser.json());
app.use(cors());

// Define POST endpoint to handle interactions
app.post('/api/interactions', (req, res) => {
  const interactionData = req.body;
  const interaction = new Interaction(interactionData);

  // Save interaction to the database
  interaction.save()
    .then(() => res.status(200).send('Interaction logged'))
    .catch(err => res.status(500).send('Error logging interaction: ' + err));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});