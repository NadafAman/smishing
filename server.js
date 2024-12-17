const express = require('express');
const bodyParser = require('body-parser');
const { trainClassifier, classifyMessage } = require('./classifier');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Train the classifier when the server starts
trainClassifier().then(() => {
  console.log('Classifier ready');
});

// API Endpoint to classify a message
app.post('/classify', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  const result = classifyMessage(message);
  res.json({ message, classification: result });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
