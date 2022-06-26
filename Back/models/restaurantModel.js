const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const restaurantSchema = mongoose.Schema(
  {
    value: { type: String, },
    date: { type: Date },
  },
  { timestamps: true }
);


// Modelis DB lentelės pavadinimas
const RestaurantModel = new mongoose.model("Restaurant", restaurantSchema);



module.exports = RestaurantModel;