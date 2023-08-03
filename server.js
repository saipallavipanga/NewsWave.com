// server.js
const express = require('express');
const app = express();
const port = 3000; // Change this port number as needed

// Create an array to store the posts
let posts = [];

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API endpoint to get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// API endpoint to create a new post
app.post('/api/posts', (req, res) => {
  const { username, text, fileData } = req.body;
  const post = { username, text, fileData };
  posts.push(post);
  res.json(post);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
