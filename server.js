require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


const interactionSchema = new mongoose.Schema({
  objectName: String,
  interactionType: String,
  timestamp: Date,
  
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

  
  interaction.save()
    .then(() => res.status(200).send('Interaction logged'))
    .catch(err => {
      console.error('Error logging interaction:', err);
      res.status(500).send('Error logging interaction');
    });
});


app.get('/api/interactions', (req, res) => {
  Interaction.find()
    .then(interactions => res.status(200).json(interactions))
    .catch(err => {
      console.error('Error retrieving interactions:', err);
      res.status(500).send('Error retrieving interactions');
    });
});


app.get('/api/interactions/:type', (req, res) => {
  const interactionType = req.params.type;
  Interaction.find({ interactionType: interactionType })
    .then(interactions => res.status(200).json(interactions))
    .catch(err => {
      console.error(`Error retrieving interactions of type ${interactionType}:`, err);
      res.status(500).send('Error retrieving interactions');
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});