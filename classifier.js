const natural = require('natural');
const fs = require('fs');
const csv = require('csv-parser');

const classifier = new natural.BayesClassifier();

// Function to load data from CSV and train the classifier
const trainClassifier = async () => {
  return new Promise((resolve) => {
    fs.createReadStream('./data/messages.csv')
      .pipe(csv())
      .on('data', (row) => {
        const message = row.message; // Replace 'message' with the column name in CSV
        const label = row.label; // Replace 'label' with the column (e.g., 'spam', 'ham', 'smishing')
        classifier.addDocument(message, label);
      })
      .on('end', () => {
        classifier.train();
        console.log('Training complete');
        resolve();
      });
  });
};

// Function to classify a new message
const classifyMessage = (message) => {
  return classifier.classify(message);
};

module.exports = { trainClassifier, classifyMessage };
