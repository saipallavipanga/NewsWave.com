const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // Change this port number if necessary

app.use(cors());
app.use(bodyParser.json());

// Store posts in memory (replace this with a database in a real-world application)
let posts = [];

app.post('/api/posts', (req, res) => {
  const { username, text, fileData } = req.body;
  if (!username || !text) {
    return res.status(400).json({ error: 'Username and post text are required.' });
  }

  const post = { username, text, fileData, comments: [] };
  posts.push(post);
  res.json({ message: 'Post added successfully!', post });
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
