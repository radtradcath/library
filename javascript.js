const showBtn = document.getElementById('showDialog');
const dialog = document.querySelector('dialog');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookRead = document.querySelector('#read');
const cancelDialog = document.getElementById('cancel-dialog');
const submitDialog = document.getElementById('submit-dialog');
const cardContainer = document.querySelector('.cardCtn');
let card = document.createElement('div');
let inputTitle;
let inputAuthor;
let inputPages;
let inputRead;

// let myLibrary = [];

// let counter = 0;

class Book {    

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = Book.increaseCounter();
    }

    static counter = 0;

    static increaseCounter() {
        return Book.counter++;
    }

    static myLibrary = [];

    static createNewBook() {
        let book = new Book(inputTitle, inputAuthor, inputPages, inputRead);
        return book;
    }

    static addBookToLibrary() {
        let book = Book.createNewBook();
        Book.myLibrary.push(book);
        return book.id;
    }
}

function createNewCard(t, a, p, r, bookId) {
    let card = document.createElement('div');
    let cardHeader = document.createElement('h4');
    let cardAuthor = document.createElement('div');
    let cardPages = document.createElement('div');
    let cardRead = document.createElement('div');
    let deleteButton = document.createElement('button');
    let toggleRead = document.createElement('button');
    card.appendChild(cardHeader);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(cardRead);
    card.appendChild(deleteButton);
    card.appendChild(toggleRead);
    card.dataset.index = bookId;
    deleteButton.textContent = "Delete Book";
    toggleRead.textContent = "Toggle Read";

    cardHeader.textContent = t;
    cardAuthor.textContent = a;
    cardPages.textContent = p;
    cardRead.textContent = r;

    card.setAttribute('style', 'background-color: rgb(24, 141, 161); width: 300px; height: 400px; margin-top: 20px; display: flex; flex-direction: column; justify-content: space-between; align-items: center; overflow-wrap: break-word');
    cardContainer.appendChild(card);

    deleteButton.setAttribute('style', 'width: 100px; height: 50px; font-size: 1rem');
    toggleRead.setAttribute('style', 'width: 100px; height: 50px; font-size: 1rem');

    deleteButton.addEventListener('click', function () {
        let toDelete = Book.myLibrary.filter((obj) => {
            return obj.id != card.dataset.index
        });

        Book.myLibrary = toDelete;
        deleteButton.parentElement.remove();
    });

    toggleRead.addEventListener('click', function () {
        let toToggle = Book.myLibrary.findIndex((obj) => {
            return obj.id == card.dataset.index;
        });
        console.log(toToggle);
        Book.myLibrary[toToggle].read == 'read' ? Book.myLibrary[toToggle].read = 'not read' : Book.myLibrary[toToggle].read = 'read';
        cardRead.textContent = Book.myLibrary[toToggle].read;
    })
};

submitDialog.addEventListener('click', (e) => {
    if (bookPages.value <= 0) {
        return void(0);
    }
    e.preventDefault();
    dialog.close();
    inputTitle = bookTitle.value;
    inputAuthor = bookAuthor.value;
    inputPages = bookPages.value + " pages";
    inputRead = bookRead.hasAttribute('class') ? "read" : "not read";
    createNewCard(inputTitle, inputAuthor, inputPages, inputRead, Book.addBookToLibrary());
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";

    // dialog.close();
    // e.preventDefault();
});

bookRead.addEventListener('click', () => {
    if (!bookRead.hasAttribute('class')) {
        console.log(bookRead.hasAttribute('class'));
        bookRead.setAttribute('class', "check");
        console.log(bookRead.hasAttribute('class'));
    } else {
         bookRead.removeAttribute('class');
    }
});

showBtn.addEventListener('click', () => {
    dialog.showModal();
});


