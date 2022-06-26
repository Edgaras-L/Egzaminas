const Restaurants = require("./../models/RestaurantModel");



exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurant = await Restaurants.find();
    res.status(200).json({
      status: "success",
      results: restaurant.length,
      data: {
        restaurant: restaurant,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

  exports.addNewRestaurant = async (req, res) => {
    try {
        const newRestaurant = await Restaurants.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: newRestaurant
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};


exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurants.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurants.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};


exports.deleteRestaurant = async (req, res) => {
  try {
    await Restaurants.findOneAndUpdate(
      {'restaurant._id': req.params.subId},
      { $pull: { restaurant: { _id: req.params.subId } } }
    );
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
