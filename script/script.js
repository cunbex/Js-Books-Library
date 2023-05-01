const addBook = document.querySelector("#add-book-button");
const body = document.querySelector("body");
const books = document.querySelector(".books");
const bookInfo = document.querySelector(".book-info");
const submitBook = document.querySelector(".submit-book");
const closeFormPanel = document.querySelector(".close-form");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function updateReadBook(e) {
  e.target.classList.toggle("read");
  e.target.classList.toggle("not-read");
  const index = myLibrary.findIndex(
    (a) => a.author === e.target.parentNode.firstChild.textContent
  );
  const reverse = myLibrary[index].read;
  myLibrary[index].read = !reverse;
}

function removeBook(e) {
  e.target.parentNode.remove();
  myLibrary.splice(
    myLibrary.findIndex(
      (a) => a.author === e.target.parentNode.firstChild.textContent
    ),
    1
  );
}

function createHtmlBook(obj) {
  const bookDiv = document.createElement("div");
  const title = document.createElement("h1");
  const author = document.createElement("h1");
  const pages = document.createElement("h1");
  const read = document.createElement("button");
  const deleteBook = document.createElement("button");
  read.addEventListener("click", updateReadBook);
  bookDiv.classList.add("book-card");
  deleteBook.addEventListener("click", removeBook);
  title.textContent = obj.title;
  author.textContent = obj.author;
  pages.textContent = obj.pages;
  read.textContent = "Read";
  if (obj.read) {
    read.classList.toggle("read");
  } else {
    read.classList.toggle("not-read");
  }
  deleteBook.textContent = "Delete Book";
  bookDiv.append(title, author, pages, read, deleteBook);
  books.appendChild(bookDiv);
}

function addBookToLibrary(obj) {
  myLibrary.push(obj);
  createHtmlBook(obj);
}

function updateBookCardsState(state) {
  const cards = document.querySelectorAll(".book-card");
  if (state === "dark") {
    body.classList.add("dark");
    body.classList.remove("light");
    cards.forEach((card) => {
      card.classList.add("dark");
      card.classList.remove("light");
    });
  } else {
    body.classList.add("light");
    body.classList.remove("dark");
    cards.forEach((card) => {
      card.classList.add("light");
      card.classList.remove("dark");
    });
  }
}
function openForm() {
  bookInfo.style.visibility = "visible";
  updateBookCardsState("dark");
}
function closeForm() {
  bookInfo.style.visibility = "hidden";
  updateBookCardsState("light");
}
function resetForm() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.name === "read") {
      input.checked = false;
    }
    input.value = "";
  });
}
function checkBookExistence() {
  const exist = myLibrary.some(
    (book) => book.title === document.querySelector("input[name=title]").value
  );
  return exist;
}

function checkBookInformations() {
  if (
    document.querySelector("input[name=title]").value === "" ||
    document.querySelector("input[name=author]").value === "" ||
    document.querySelector("input[name=pages]").value === ""
  ) {
    return true;
  }
  return false;
}

function getBookData(e) {
  e.preventDefault();
  if (checkBookInformations()) {
    confirm("Please fill title/author/pages fields");
    return;
  }
  if (checkBookExistence() === true) {
    confirm("book Already exists!");
    return;
  }
  const book = new Book(
    document.querySelector("input[name=title]").value,
    document.querySelector("input[name=author]").value,
    document.querySelector("input[name=pages]").value,
    document.querySelector("input[name=read]").checked
  );
  addBookToLibrary(book);
  closeForm();
  resetForm();
}

submitBook.addEventListener("click", getBookData);
addBook.addEventListener("click", openForm);
closeFormPanel.addEventListener("click", closeForm);
