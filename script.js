// script.js
// ...

// Define the server URL
const serverUrl = 'https://saipallavipanga.github.io/NewsWave.com/';

function submitPost() {
  // ...

  const post = {
    username,
    text: postText,
    fileData: post.fileData // Add the fileData to the post object
  };

  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
  .then(response => response.json())
  .then(newPost => {
    posts.push(newPost);
    updatePosts();
  })
  .catch(error => console.error('Error submitting post:', error));
}

function loadPosts() {
  fetch(serverUrl)
    .then(response => response.json())
    .then(data => {
      posts = data;
      updatePosts();
    })
    .catch(error => console.error('Error loading posts:', error));
}

loadPosts();
