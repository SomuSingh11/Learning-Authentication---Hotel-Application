const express = require("express");
const router = express.Router();
const MenuItem = require("../model/MenuItems");

// Controller function to handle the creation of a new menu item
async function handleGenerateNewMenuItem(req, res) {
  try {
    const ItemData = req.body; // Get the item data from the request body

    //Create a new Person document using Mongoose Model
    const newMenuItem = new MenuItem(ItemData);

    // Save the new person to the database
    const response = await newMenuItem.save();
    console.log("New Menu Item Created :", response);

    // Send a success response with the created menu item
    res.status(201).json(newMenuItem);
  } catch (err) {
    console.log(err);
    // Send an error response in case of any issues
    res
      .status(500)
      .json({ error: "Can't create new Menu Item : Internal Server Error" });
  }
}

// Controller function to handle retrieving all menu items
async function handleGetAllMenuItems(req, res) {
  try {
    const allMenuItems = await MenuItem.find({});
    console.log("Successfully Retrieved");
    res.status(201).json(allMenuItems);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Can't retrieve details : Internal Server Error" });
  }
}

// Controller function to handle retrieving menu items by taste
async function handleGetMenuItemByTaste(req, res) {
  try {
    const taste = req.params.taste;
    if (taste == "sour" || taste == "sweet" || taste == "spicy") {
      const response = await MenuItem.find({ taste: taste });
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid tateType (/menu/:taste)" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Internal Server Error (/menu/:taste)" });
  }
}

module.exports = {
  handleGenerateNewMenuItem,
  handleGetAllMenuItems,
  handleGetMenuItemByTaste,
};
