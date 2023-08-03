function submitPost() {
  const username = document.getElementById('username').value;
  const postText = document.getElementById('post').value;
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];

  if (username.trim() === '' || postText.trim() === '') {
    alert('Username and post cannot be empty.');
    return;
  }

  const post = {
    username,
    text: postText,
    fileData: '',
  };

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      post.fileData = e.target.result;
      savePostToServer(post);
    };

    reader.readAsDataURL(file);
  } else {
    savePostToServer(post);
  }
}

function savePostToServer(post) {
  fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) => {
      posts.push(data.post);
      updatePosts();
    })
    .catch((error) => {
      console.error('Error saving post:', error);
    });
}

function loadPostsFromServer() {
  fetch('http://localhost:3000/api/posts')
    .then((response) => response.json())
    .then((data) => {
      posts = data;
      updatePosts();
    })
    .catch((error) => {
      console.error('Error loading posts:', error);
    });
}

loadPostsFromServer();
