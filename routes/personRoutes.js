const express = require("express");
const router = express.Router();
const Person = require("../model/Person");

// Import controller functions
const {
  handleGenerateNewPerson,
  handleLoginPerson,
  handleGetProfile,
  handleGetAllPerson,
  handleGetPersonByWorkType,
  handleUpdatePersonById,
  handleDeletePersonById,
} = require("../controller/person");
const { jwtAuthMiddleware } = require("../services/jwt");

//// POST Route to add a new person (signup)
router.post("/signup", handleGenerateNewPerson);

// POST Route to login
router.post("/login", handleLoginPerson);

// GET Route to view Profile (JWT_Authenticated)
router.get("/profile", jwtAuthMiddleware, handleGetProfile);

// GET Route to retrieve all persons
router.get("/", handleGetAllPerson);

// GET Route to retrieve persons by work type
router.get("/:workType", handleGetPersonByWorkType);

// PUT Route to update persons information by id
router.put("/:id", handleUpdatePersonById);

// Delete Route to delete persons information by id
router.delete("/:id", handleDeletePersonById);

module.exports = router;
