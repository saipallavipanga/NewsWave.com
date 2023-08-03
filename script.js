let posts = [];

function submitPost() {
  const username = document.getElementById('username').value;
  const postText = document.getElementById('post').value;
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0]; // Get the first selected file (single file upload)

  if (username.trim() === '' || postText.trim() === '') {
    alert('Username and post cannot be empty.');
    return;
  }

  const post = {
    username,
    text: postText,
    comments: [],
  };

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      post.fileData = e.target.result; // Store the base64-encoded file data
      posts.push(post);
      updatePosts();
    };

    reader.readAsDataURL(file); // Read the file as a Data URL (base64-encoded)
  } else {
    posts.push(post);
    updatePosts();
  }
}

function updatePosts() {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  posts.forEach((post) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const usernameElem = document.createElement('span');
    usernameElem.classList.add('username');
    usernameElem.textContent = post.username;

    const postTextElem = document.createElement('p');
    postTextElem.textContent = post.text;

    if (post.fileData) {
      const filePreviewElem = document.createElement('img');
      filePreviewElem.classList.add('file-preview');
      filePreviewElem.src = post.fileData;
      postDiv.appendChild(filePreviewElem);
    }

    const commentListElem = document.createElement('ul');
    post.comments.forEach((comment) => {
      const commentElem = document.createElement('li');
      commentElem.classList.add('comment');
      commentElem.textContent = comment;
      commentListElem.appendChild(commentElem);
    });

    const commentInputElem = document.createElement('input');
    commentInputElem.placeholder = 'Write a comment...';

    const commentButtonElem = document.createElement('button');
    commentButtonElem.textContent = 'Post Comment';
    commentButtonElem.onclick = () => {
      const commentText = commentInputElem.value;
      if (commentText.trim() !== '') {
        post.comments.push(commentText);
        updatePosts();
      }
    };

    postDiv.appendChild(usernameElem);
    postDiv.appendChild(postTextElem);
    postDiv.appendChild(commentListElem);
    postDiv.appendChild(commentInputElem);
    postDiv.appendChild(commentButtonElem);

    postsContainer.appendChild(postDiv);
  });
}
