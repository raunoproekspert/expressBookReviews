const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const user = req.body;
  if (!user.username || !user.password) {
    console.log("Username or password is missing");
    return res.status(400).json({"message": "Username or password is missing"});
  }
  if (users.filter((dbUser) => dbUser.username === user.username).length > 0) {
    console.log(`User ${user.username} already exists.`);
    return res.status(400).json({"message": "User already exists."});
  }
  users.push(user);
  res.status(200)
  .json({"message": `User ${JSON.stringify(user)} successfully created.`});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    console.log("GET books");
    return res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    console.log(`GET book by ISBN ${req.params.isbn}`);
    if (!req.params.isbn || !books[req.params.isbn]) {
        console.log(`Book not found by ISBN ${req.params.isbn}`);
        return res.status(404).json({"message": "Book not found"});
    }
    return res.send(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    console.log(`GET book by author ${req.params.author}`);
    if (!author) {
        return res.status(400).json({"message": "Invalid request."});
    }
    let book;
    Object.keys(books).forEach(id => {
        if (books[id].author === author) {
            return res.send(books[id]);
        }
    });
    console.log(`Book not found by author ${author}`);
    return res.send(404).json({"message": "Book not found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    console.log(`GET book by author ${req.params.author}`);
    if (!title) {
        return res.status(400).json({"message": "Invalid request."});
    }
    let book;
    Object.keys(books).forEach(id => {
        if (books[id].title === title) {
            return res.send(books[id]);
        }
    });
    console.log(`Book not found by title ${title}`);
    return res.send(404).json({"message": "Book not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  console.log(`GET book review by ISBN ${isbn}`);
    if (!isbn || !books[isbn]) {
        console.log(`Book not found by ISBN ${isbn}`);
        return res.status(404).json({"message": "Book not found"});
    }
    return res.send(books[isbn].reviews);
});

module.exports.general = public_users;
