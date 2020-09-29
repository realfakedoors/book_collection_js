let bookCollection = [];

class Book {
  constructor(title, author, year, genre) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;

    this.readStatus = false;
  }
}

function addBookToCollection(book) {
  bookCollection.push(book);
}

const monteCristo = new Book(
  "The Count of Monte Cristo",
  "Alexandre Dumas",
  1844,
  "Adventure"
);
const treasure = new Book(
  "Treasure Island",
  "Robert Louis Stevenson",
  1883,
  "Adventure"
);
const dubliners = new Book(
  "Dubliners",
  "James Joyce",
  1914,
  "Short Story"
);

addBookToCollection(monteCristo);
addBookToCollection(treasure);
addBookToCollection(dubliners);

const bookshelf = document.getElementById("bookshelf");

function render(collection) {
  // Drop all books from the previous collection.
  while (bookshelf.firstChild) {
    bookshelf.removeChild(bookshelf.firstChild);
  }

  // Add each book in bookCollection to the bookshelf.
  bookCollection.forEach((book, i) => {
    let newBook = document.createElement("span");
    newBook.setAttribute("class", "book");

    let title = document.createElement("h2");
    title.setAttribute("class", "title");
    title.textContent = book.title;
    newBook.appendChild(title);

    let author = document.createElement("h3");
    author.setAttribute("class", "author");
    author.textContent = book.author;
    newBook.appendChild(author);

    let year = document.createElement("h5");
    year.setAttribute("class", "year");
    year.textContent = book.year;
    newBook.appendChild(year);

    let genre = document.createElement("h5");
    genre.setAttribute("class", "genre");
    genre.textContent = book.genre;
    newBook.appendChild(genre);

    let readButton = document.createElement("input");
    readButton.setAttribute("type", "button");
    readButton.setAttribute("class", "read-button");
    readButton.setAttribute("value", "Read it?");
    if (book.readStatus == true) {
      readButton.setAttribute("class", "read-button already-read");
      readButton.setAttribute("value", "Read it!");
    }
    newBook.appendChild(readButton);

    let deleteButton = document.createElement("input");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.setAttribute("value", "X");
    newBook.appendChild(deleteButton);

    bookshelf.appendChild(newBook);
  });

  // Add an event listener for each book's read status button,
  let readButtons = document.getElementsByClassName("read-button");
  readButtons = Array.from(readButtons);
  readButtons.forEach((button, i) => {
    button.addEventListener("click", function (button) {
      if (bookCollection[i].readStatus) {
        bookCollection[i].readStatus = false;
      } else {
        bookCollection[i].readStatus = true;
      }
      render(bookCollection);
    });
  });

  // Along with each book's delete button.
  let deleteButtons = document.getElementsByClassName("delete-button");
  deleteButtons = Array.from(deleteButtons);
  deleteButtons.forEach((button, i) => {
    button.addEventListener("click", function (button) {
      bookCollection.splice(i, 1);
      render(bookCollection);
    });
  });
}

const title = document.getElementById("title-field");
const author = document.getElementById("author-field");
const year = document.getElementById("year-field");
const genre = document.getElementById("genre-field");
const fields = [title, author, year, genre];

// Submitting our form creates a new book.
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", function () {
  const newBook = new Book(title.value, author.value, year.value, genre.value);
  clearAllErrors();

  // Let's validate submissions client-side,
  // so we can ensure good UX and help protect our application.
  if (
    fields.every(function (field) {
      return field.validity.valid;
    })
  ) {
    addBookToCollection(newBook);
    render(bookCollection);
  } else {
    showAllErrors();
    event.preventDefault();
  }
});

const errorWindow = document.getElementById("errors");

function showAllErrors() {
  let errors = [];

  // Generate all relevant error messages,
  if (title.validity.valueMissing) {
    title.className = "invalid-input";
    errors.push([
      "You forgot a title!",
      "Can't have a book without a title...",
    ]);
  }
  if (author.validity.valueMissing) {
    author.className = "invalid-input";
    errors.push([
      "Uhh, you forgot the author.",
      "Don't tell me NOBODY wrote this!",
    ]);
  }
  if (year.validity.valueMissing) {
    year.className = "invalid-input";
    errors.push([
      "Whoops, enter a year.",
      "This had to be written sometime...",
    ]);
  }
  if (year.validity.rangeOverflow) {
    year.className = "invalid-input";
    errors.push([
      "Future year entered!",
      "How the heck? Where's your DeLorean?",
    ]);
  }
  if (year.validity.rangeUnderflow) {
    year.className = "invalid-input";
    errors.push([
      "A year before 1558?",
      "We don't deal with pre-Elizabethan texts!",
    ]);
  }

  // And then display them.
  errors.forEach((error) => {
    let message = document.createElement("div");
    message.setAttribute("class", "error");

    let title = document.createElement("h3");
    title.textContent = error[0];
    title.setAttribute("class", "error-title");
    message.appendChild(title);

    let body = document.createElement("p");
    body.textContent = error[1];
    body.setAttribute("class", "error-body");
    message.appendChild(body);

    errorWindow.appendChild(message);
  });
}

function clearAllErrors() {
  while (errorWindow.firstChild) {
    errorWindow.removeChild(errorWindow.firstChild);
  }

  fields.forEach((field) => {
    field.className = "";
  });
}

render(bookCollection);
