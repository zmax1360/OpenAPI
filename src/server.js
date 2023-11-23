const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chatDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model if you want to save the data
// const chatSchema = new mongoose.Schema({
//   text: String,
//   response: String,
// });

// const Chat = mongoose.model('Chat', chatSchema);

// Handle POST request to /api/chat
app.post('/api/chat', (req, res) => {
  const { text } = req.body;

  // Save to MongoDB if needed
  // const chat = new Chat({ text });
  // chat.save();

  // For demonstration purposes, just echo the text back
  res.json({ answer: `You said: ${text}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});