export class restAPI{
  // CREATE - POST
  static createBookData = (data) => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(data);
    localStorage.setItem("books", JSON.stringify(books));
    return books;
  };

  static createAdminData = (data) => {
    const administrators = JSON.parse(localStorage.getItem("administrators")) || [];
    administrators.push(data);
    localStorage.setItem("administrators", JSON.stringify(administrators));
    return data;
  };

  // READ - GET (by Book Name)
  static getBookData = (book_name) => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    return books.find((book) => book.book_name === book_name);
  };

  static getAdminData = (Username) => {
    const administrators = JSON.parse(localStorage.getItem("administrators")) || [];
    return administrators.find((admin) => admin.UserName === Username);
  };

  // READ - GET (all)
  static getAllBookData = () => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    return books;
  };

  // UPDATE - PUT
  static updateBookData = (book_name, data) => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const bookIndex = books.findIndex((book) => book.book_name === book_name);
    if (bookIndex !== -1) {
      books[bookIndex] = { ...books[bookIndex], ...data };
      localStorage.setItem("books", JSON.stringify(books));
      return books[bookIndex];
    }
    return null;
  };

  // DELETE - DELETE
  static deleteBookData = (book_name) => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const newBooks = books.filter((book) => book.book_name !== book_name);
    if (newBooks.length !== books.length) {
      localStorage.setItem("books", JSON.stringify(newBooks));
      return newBooks;
    }
    return null;
  };
}