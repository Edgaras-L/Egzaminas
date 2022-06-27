const Books = require("./../models/bookModel");



exports.getAllBooks = async (req, res) => {
  try {
    const Book = await Books.find();
    res.status(200).json({
      status: "success",
      results: Book.length,
      data: {
        Book: Book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

  exports.addNewBook = async (req, res) => {
    try {
        const newBook = await Books.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
              Book: newBook
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};


exports.getBookById = async (req, res) => {
  try {
    const Book = await Books.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        Book: Book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const Book = await Books.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        Book: Book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};



exports.deleteBook = async (req, res) => {
  console.log(req.params.id)
  try {
    const Book = await Books.findByIdAndDelete(req.params.id);
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
