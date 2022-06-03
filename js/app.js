// call api
const apiUrl =
	'https://my-json-server.typicode.com/jelsonjay/backend-fake-api/blogs';

const loading = document.querySelector('#loading');
const postsContent = document.querySelector('#posts');

const postPage = document.querySelector('#post');
const postContainer = document.querySelector('#post-container');
const commentsContainer = document.querySelector('#comments-container');

// get id from url
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get('id');

// get all posts
async function getAllPosts() {
	const res = await fetch(apiUrl);

	console.log(res);
	const data = await res.json();
	console.log(data);
	loading.classList.add('hide');

	data.map(post => {
		const div = document.createElement('div');
		const title = document.createElement('h2');
		const body = document.createElement('p');
		const link = document.createElement('a');

		title.innerText = post.title;
		body.innerText = post.body;
		link.innerText = 'Read More';
		link.setAttribute('href', `/post.html?id=${post.id}`);

		div.appendChild(title);
		div.appendChild(body);
		div.appendChild(link);

		postsContent.appendChild(div);
	});
}

// get single post
async function getPost(id) {
	const [resPost, resComments] = await Promise.all([
		fetch(`${apiUrl}/${id}`),
		fetch(`${apiUrl}/${id}/comments`)
	]);

	const dataPost = await resPost.json();
	const dataComments = await resComments.json();

	loading.classList.add('hide');
	postPage.classList.remove('hide');

	const title = document.createElement('h1');
	const body = document.createElement('p');

	title.innerText = dataPost.title;
	body.innerText = dataPost.body;

	postContainer.appendChild(title);
	postContainer.appendChild(body);

	console.log(dataComments, 'comments');

	dataComments.map(comment => {
		createComment(comment);
	});
}
// create comment
function createComment(comment) {
	const div = document.createElement('div');
	const email = document.createElement('h3');
	const bodyWrap = document.createElement('p');

	email.innerText = comment.email;
	bodyWrap.innerText = comment.email;

	div.appendChild(email);
	div.appendChild(bodyWrap);

	commentsContainer.appendChild(div);
}

if (!postId) {
	getAllPosts();
} else {
	getPost(postId);
}
