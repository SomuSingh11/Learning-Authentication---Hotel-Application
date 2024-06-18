const mongoose = require("mongoose");

//Define the MongoDB Connection URL
const mongoURL = process.env.MongoDB_URL;

//Set Up MongooseDB Connection
mongoose.connect(mongoURL);

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export the database connection
module.exports = db;
