
const e = require("express");
const Transactions = require("../models/TransactionsModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Transactions.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        transactions: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.createNewUser = async (req, res) => {
  console.log(req.body)
  try {
    const newUsers = await Transactions.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        transactions: newUsers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const users = await Transactions.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        transactions: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.updateUser = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const user = await Transactions.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });

    res.status(200).json({
      status: "success",
      data: {
        transactions: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  console.log(req.params.id)
  try {
    const users = await Transactions.findByIdAndDelete(req.params.id);
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
