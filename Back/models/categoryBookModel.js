const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const categoryBookSchema = mongoose.Schema(
  {
    value: { type: String, },
    date: { type: Date },
  },
  { timestamps: true }
);


// Modelis DB lentelės pavadinimas
const CategoryBookModel = new mongoose.model("CategoryBook", categoryBookSchema);



module.exports = CategoryBookModel;