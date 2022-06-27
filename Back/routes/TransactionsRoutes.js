const express = require("express");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

const {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUser,
  deleteUserById,
} = require("../controllers/TransactionsController");

const { signup, signin, signout } = require("../controllers/auth.controller")

const router = express.Router();

//User
router.route("/:id").get(getUserById).patch(updateUser);
router.route("/newUsers/create").patch(createNewUser);
router.route("/:id/update").patch(updateUser);
router.route("/deleteUser/:id").patch(deleteUserById);
router.route("/").get(getAllUsers);

router.route('/auth/signup').post([
  verifySignUp.checkDuplicateUsernameOrEmail,
  verifySignUp.checkRolesExisted
],
  controller.signup)

router.route("/auth/signin").post(controller.signin);

module.exports = router;
