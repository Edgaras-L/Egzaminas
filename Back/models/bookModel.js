const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const BookSchema = mongoose.Schema(
  {
    value: { type: String, },
    date: { type: Date },
  },
  { timestamps: true }
);


// Modelis DB lentelės pavadinimas
const BookModel = new mongoose.model("Book", BookSchema);



module.exports = BookModel;