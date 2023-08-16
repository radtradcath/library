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

let myLibrary = [];

let counter = 0;

function Book(title, author, pages, read) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
    this.id = Book.prototype.counter++
}

Book.prototype.counter = 0;

function addBookToLibrary() {
    let book = new Book(inputTitle, inputAuthor, inputPages, inputRead);
    myLibrary.push(book);
    return book.id;
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

    card.setAttribute('style', 'background-color: red; width: 300px; height: 400px; margin-top: 20px; display: flex; flex-direction: column; justify-content: space-between; align-items: center; overflow-wrap: break-word');
    cardContainer.appendChild(card);

    deleteButton.setAttribute('style', 'width: 100px; height: 50px; font-size: 1rem');
    toggleRead.setAttribute('style', 'width: 100px; height: 50px; font-size: 1rem');

    deleteButton.addEventListener('click', function () {
        let toDelete = myLibrary.filter((obj) => {
            return obj.id != card.dataset.index
        });

        myLibrary = toDelete;
        deleteButton.parentElement.remove();
    });

    toggleRead.addEventListener('click', function () {
        let toToggle = myLibrary.findIndex((obj) => {
            return obj.id == card.dataset.index;
        });
        console.log(toToggle);
        myLibrary[toToggle].read == 'read' ? myLibrary[toToggle].read = 'not read' : myLibrary[toToggle].read = 'read';
        cardRead.textContent = myLibrary[toToggle].read;
    })
};

submitDialog.addEventListener('click', () => {
    inputTitle = bookTitle.value;
    inputAuthor = bookAuthor.value;
    inputPages = bookPages.value + " pages";
    inputRead = bookRead.hasAttribute('class') ? "read" : "not read";
    createNewCard(inputTitle, inputAuthor, inputPages, inputRead, addBookToLibrary());
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";

    dialog.close();
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

submitDialog.addEventListener('click', (e) => {
    e.preventDefault();
})

