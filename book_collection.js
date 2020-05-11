let bookCollection = [];

class Book {
  constructor(title, author, year, genre) {
    this.title      = title;
    this.author     = author;
    this.year       = year;
    this.genre      = genre;
    
    this.readStatus = false;
  }
}

function addBookToCollection (book) { 
  bookCollection.push(book); 
}

const monteCristo = new Book('The Count of Monte Cristo', 'Alexandre Dumas', 1844, 'Adventure');
const treasure    = new Book('Treasure Island', 'Robert Louis Stevenson', 1883, 'Adventure');
const dubliners   = new Book('Dubliners', 'James Joyce', 1914, 'Short Story');

addBookToCollection(monteCristo);
addBookToCollection(treasure);
addBookToCollection(dubliners);

const bookshelf = document.getElementById('bookshelf');

function render(collection) {
  // Drop all books from the previous collection.
  while(bookshelf.firstChild){
    bookshelf.removeChild(bookshelf.firstChild);
  }
  
  // Add each book in bookCollection to the bookshelf.
  bookCollection.forEach( (book, i) => {
    let newBook = document.createElement('span');
    newBook.setAttribute('class', 'book');
    
    let title = document.createElement('h2');
    title.setAttribute('class', 'title');
    title.textContent = book.title;
    newBook.appendChild(title);
    
    let author = document.createElement('h3');
    author.setAttribute('class', 'author');
    author.textContent = book.author;
    newBook.appendChild(author);
    
    let year = document.createElement('h5');
    year.setAttribute('class', 'year');
    year.textContent = book.year;
    newBook.appendChild(year);
    
    let genre = document.createElement('h5');
    genre.setAttribute('class', 'genre');
    genre.textContent = book.genre;
    newBook.appendChild(genre);
    
    let readButton = document.createElement('input');
    readButton.setAttribute('type',  'button');
    readButton.setAttribute('class', 'read-button');
    readButton.setAttribute('value', 'Read it?');
    if (book.readStatus == true){
      readButton.setAttribute('class', 'read-button already-read');
      readButton.setAttribute('value', 'Read it!');
    };
    newBook.appendChild(readButton);
    
    let deleteButton = document.createElement('input');
    deleteButton.setAttribute('type',  'button');
    deleteButton.setAttribute('class', 'delete-button');    
    deleteButton.setAttribute('value', 'X');
    newBook.appendChild(deleteButton);
    
    bookshelf.appendChild(newBook);
  });
  
  // Add an event listener for each book's read status button,
  let readButtons = document.getElementsByClassName('read-button');
  readButtons = Array.from(readButtons);
  readButtons.forEach( (button, i) => {
    button.addEventListener('click', function(button) {
      if (bookCollection[i].readStatus){
        bookCollection[i].readStatus = false;
      } else {
        bookCollection[i].readStatus = true;
      };
      render(bookCollection);
    });
  });
  
  // Along with each book's delete button.
  let deleteButtons = document.getElementsByClassName('delete-button');
  deleteButtons = Array.from(deleteButtons);
  deleteButtons.forEach( (button, i) => {
    button.addEventListener('click', function(button) {
      bookCollection.splice(i, 1);
      render(bookCollection);
    });
  });
}

// Submitting our form creates a new book.
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', function () {
  const title  = document.getElementById('title-field').value;
  const author = document.getElementById('author-field').value;
  const year   = document.getElementById('year-field').value;
  const genre  = document.getElementById('genre-field').value;
  const freshBook = new Book(title, author, year, genre);
  
  addBookToCollection(freshBook);
  render(bookCollection);
});

render(bookCollection);