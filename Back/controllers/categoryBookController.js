const CategoryBooks = require("./../models/categoryBookModel");



exports.getAllCategoryBooks = async (req, res) => {
  try {
    const categoryBook = await CategoryBooks.find();
    res.status(200).json({
      status: "success",
      results: categoryBook.length,
      data: {
        categoryBook: categoryBook,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

  exports.addNewCategoryBook = async (req, res) => {
    try {
        const newCategoryBook = await CategoryBooks.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
              categoryBook: newCategoryBook
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};


exports.getCategoryBookById = async (req, res) => {
  try {
    const categoryBook = await CategoryBooks.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        categoryBook: categoryBook,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateCategoryBook = async (req, res) => {
  try {
    const categoryBook = await CategoryBooks.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        categoryBook: categoryBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};



exports.deleteCategoryBook = async (req, res) => {
  console.log(req.params.id)
  try {
    const CategoryBook = await CategoryBooks.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
