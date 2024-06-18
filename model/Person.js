const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Define the Person Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"], //Only one of the 3 values is allowed for this field
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// the pre('save') middleware is only triggered by the save() method.
//This means that if you are using a put or update operation that doesn't explicitly call save(), the middleware will not be invoked.
personSchema.pre("save", async function (next) {
  const person = this;

  //Hash the password only if has been modified or it is new.
  if (!person.isModified("password")) return next();
  console.log("Password  Modified");

  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);
    console.log("Salt generated:", salt);

    // hash password
    const hashPassword = await bcrypt.hash(person.password, salt);

    // Override the plain password with hashed one
    person.password = hashPassword;

    next();
  } catch (err) {
    return next(err);
  }
});

// Pre-findOneAndUpdate middleware to hash the password when password updated via PUT/PATCH
personSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Check if the password field is being updated
  if (!update.password) {
    return next();
  }

  try {
    // Generate a salt with a cost factor of 10
    const salt = await bcrypt.genSalt(10);
    console.log("Salt generated:", salt);

    // Hash the password using the generated salt
    const hashPassword = await bcrypt.hash(update.password, salt);
    console.log("Hashed password:", hashPassword);

    // Override the plain password with the hashed one
    update.password = hashPassword;

    next();
  } catch (err) {
    console.error("Error hashing password:", err);
    return next(err);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use bcrypt to compare the provided pasword with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);

    return isMatch;
  } catch (err) {
    throw err;
  }
};

// Create Person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
