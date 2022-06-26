const express = require("express");

const {
  deleteRestaurant,
  updateRestaurant,
  getAllRestaurants,
  addNewRestaurant,
  getRestaurantById,

} = require("./../controllers/restaurantController");

const router = express.Router();
router.route("/").get(getAllRestaurants);

router.route("/:id").get(getRestaurantById).post(updateRestaurant);

router.route("/:subId").post(updateRestaurant);
router.route("/:subId").delete(deleteRestaurant);

router.route("/addNewRestaurant").post(addNewRestaurant);


module.exports = router;