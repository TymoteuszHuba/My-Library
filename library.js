class Book {
	constructor(title, author, pages, status) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.status = status;
	}
}

class Library {
	constructor() {
		this.myLibrary = [];
		this.titleInput = document.querySelector('.book-title');
		this.authorInput = document.querySelector('.book-author');
		this.pagesInput = document.querySelector('.book-pages');
		this.statusInput = document.querySelector('.book-status');
		this.submitBtn = document.querySelector('.submit');

		this.form = document.querySelector('.book-form');
		this.libraryList = document.querySelector('.library-list');

		this.submitBtn.addEventListener('click', (event) => {
			event.preventDefault();
			this.addBookToLibrary();
			this.showBook();
			this.clearInputs();
		});

		this.libraryList.addEventListener('click', (event) => {
			const index = event.target.closest('.library-item').dataset.index;
			if (event.target.classList.contains('remove-btn')) {
				this.removeBook(index);
				return;
			}

			if (event.target.classList.contains('read-btn')) {
				this.statusToggle(index);
				return;
			}
		});
	}

	addBookToLibrary() {
		if (this.titleInput.value.length === 0 || this.authorInput.value.length === 0) {
			alert('Please add title or author book!');
			return;
		}

		if (this.pagesInput.value === String || this.pagesInput.value.length === 0) {
			alert('Please set a page numbers!');
			return;
		}

		const book = new Book(
			this.titleInput.value,
			this.authorInput.value,
			this.pagesInput.value,
			this.statusInput.value
		);

		this.myLibrary.push(book);
		console.log(this.myLibrary);
	}

	showBook() {
		this.libraryList.innerHTML = '';
		this.myLibrary.forEach((book, index) => {
			const bookItem = document.createElement('div');
			bookItem.classList.add('library-item');
			bookItem.setAttribute('data-index', index);
			bookItem.innerHTML = `<p>${book.title}</p>
			<p>${book.author}</p>
			<p>${book.pages}</p>
			<button class="library-item-btn read-btn">${book.status}</button>
			<button class="library-item-btn remove-btn">x</button>`;

			this.libraryList.appendChild(bookItem);
		});
	}

	removeBook(index) {
		this.myLibrary.splice(index, 1);
		this.showBook();
	}

	statusToggle(index) {
		this.myLibrary[index].status =
			this.myLibrary[index].status === 'Read' ? 'Unread' : 'Read';
		this.showBook();
	}

	clearInputs() {
		this.titleInput.value = '';
		this.authorInput.value = '';
		this.pagesInput.value = '';
	}
}

const library = new Library();
