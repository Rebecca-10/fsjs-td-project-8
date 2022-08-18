var express = require('express');
var router = express.Router();
const Book = require('../models').Book;



/* GET home page, always redirects home */
router.get('/', (async(req, res, next) => {
   res.redirect('books')
  //res.render('index', { title: 'Express' });
  //const books = await Book.findAll();
  //res.json(books);
}));

/* GET books page that shows the full list of books */
router.get('/books', async(req, res) => {
  const allBooks = await Book.findAll()
  res.render('layout', { allBooks, title: "Books" })
});

/* GET new-book page form that shows hoe to create a new book */
router.get('/books/new', async(req, res) => {
  res.render('new-book', { book: {}, title: "New Book" })
});

/* POSTs new-book to database */
router.post('/books/new', async(req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect(`/books/${book.id}`)
  } catch(error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("new-book", { book, errors: error.errors, title: 'New Book' })
    } else {
      throw error;
    }
  }

});
/* GET update-book page/form */
router.get('/books/:id', async(req, res) => {
  const book = await Book.findByPk(req.params.id)
  console.log(book)
  if (book !== null) {
    res.render('update-book', { book, title: `${book.title}` })
  } else {
    const error = {
      message: 'Page not found',
      status: 404
    };
    res.render('page-not-found', {error, title: "Page Not Found"});
  }
});
/* UPDATEs book info in the database */
router.post('/books/:id', async(req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect('/books')
  } catch(error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id; 
      res.render("update-book", { book, errors: error.errors, title: `${book.title}` })
    } else {
      throw error;
    }
  }

});

/* DELETE book from database */
router.post('/books/:id/delete', async(req, res) => {
  let book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books')
});

module.exports = router;
