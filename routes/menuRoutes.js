const express = require("express");
const router = express.Router();
const MenuItem = require("../model/MenuItems");

// Import controller functions
const {
  handleGenerateNewMenuItem,
  handleGetAllMenuItems,
  handleGetMenuItemByTaste,
} = require("../controller/menuItem");

// Route to handle the creation of a new menu item
router.post("/", handleGenerateNewMenuItem);

// Route to handle fetching all menu items
router.get("/", handleGetAllMenuItems);

// Route to handle fetching menu items by taste
router.get("/:taste", handleGetMenuItemByTaste);

module.exports = router;
