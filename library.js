const myLibrary = [];

const titleInput = document.querySelector('.book-title');
const authorInput = document.querySelector('.book-author');
const pagesInput = document.querySelector('.book-pages');
const statusInput = document.querySelector('.book-status');
const submitBtn = document.querySelector('.submit');

const form = document.querySelector('.book-form');
const libraryList = document.querySelector('.library-list');

class Book {
	constructor(title, author, pages, status) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.status = status;
	}
}

function addBookToLibrary() {
	if (titleInput.value.length === 0 || authorInput.value.length === 0) {
		alert('Please add title or author book!');
		return;
	}

	if (pagesInput.value === String || pagesInput.value.length === 0) {
		alert('Please set a page numbers!');
		return;
	}

	const book = new Book(
		titleInput.value,
		authorInput.value,
		pagesInput.value,
		statusInput.value
	);

	myLibrary.push(book);
	console.log(myLibrary);
}

function showBook() {
	libraryList.innerHTML = '';
	myLibrary.forEach((book, index) => {
		const bookItem = document.createElement('div');
		bookItem.classList.add('library-item');
		bookItem.setAttribute('data-index', index);
		bookItem.innerHTML = `<p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages}</p>
        <button class="library-item-btn read-btn">${book.status}</button>
        <button class="library-item-btn remove-btn">x</button>`;

		libraryList.appendChild(bookItem);
	});
}

function removeBook(index) {
	myLibrary.splice(index, 1);
	showBook();
}

function statusToggle(index) {
    myLibrary[index].status = myLibrary[index].status === 'Read' ? 'Unread' : 'Read';
    showBook();
}

function clearInputs() {
	titleInput.value = '';
	authorInput.value = '';
	pagesInput.value = '';
}

submitBtn.addEventListener('click', (event) => {
	event.preventDefault();
	addBookToLibrary();
	showBook();
	clearInputs();
});

libraryList.addEventListener('click', (event) => {
	const index = event.target.closest('.library-item').dataset.index;
	if (event.target.classList.contains('remove-btn')) {
		removeBook(index);
		return;
	}

	if (event.target.classList.contains('read-btn')) {
		statusToggle(index);
		return;
	}
});
