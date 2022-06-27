const express = require("express");

const {
  deleteBook,
  updateBook,
  getAllBooks,
  addNewBook,
  getBookById,

} = require("../controllers/BookController");

const router = express.Router();
router.route("/").get(getAllBooks);

router.route("/:id").get(getBookById).post(updateBook);

router.route("/Book/:id/update").patch(updateBook);
router.route("/Book/:id/delete").patch(deleteBook);

router.route("/new/addNewBook").post(addNewBook);


module.exports = router;