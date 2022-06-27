const express = require("express");

const {
  deleteCategoryBook,
  updateCategoryBook,
  getAllCategoryBooks,
  addNewCategoryBook,
  getCategoryBookById,

} = require("../controllers/categoryBookController");

const router = express.Router();
router.route("/").get(getAllCategoryBooks);

router.route("/:id").get(getCategoryBookById).post(updateCategoryBook);

router.route("/CategoryBook/:id/update").patch(updateCategoryBook);
router.route("/CategoryBook/:id/delete").patch(deleteCategoryBook);

router.route("/newCategory/addNewCategoryBook").post(addNewCategoryBook);


module.exports = router;