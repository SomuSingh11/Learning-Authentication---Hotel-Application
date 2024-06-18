const Person = require("../model/Person");
const router = require("../routes/personRoutes");
const { jwtAuthMiddleware, generateToken } = require("../services/jwt");

// Controller function to handle the creation of a new person (signup)
async function handleGenerateNewPerson(req, res) {
  try {
    const personData = req.body;

    //Create a new Person document using Mongoose Model
    const newPerson = new Person(personData);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log("New Person Created :", response);

    const payLaod = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payLaod);
    console.log("Token is : ", token);
    console.log("PayLoad is : ", JSON.stringify(payLaod));

    res.status(201).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Can't create new Person : Internal Server Error" });
  }
}

// Controller function to handle login (Login Route)
async function handleLoginPerson(req, res) {
  try {
    // Extract username and Password from request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid Username of Password" });
    }

    // Generating token as both id and user are correct
    const payLoad = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payLoad);

    //return token as a response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller function to get Profile (Note : this is JWT_Authenticated route)
async function handleGetProfile(req, res) {
  try {
    const userData = req.user;
    console.log("User data : ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller function to handle retrieving all persons
async function handleGetAllPerson(req, res) {
  try {
    const allPerson = await Person.find({});
    console.log("Successfully Retrieved");
    res.status(201).json(allPerson);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Can't retrieve details : Internal Server Error" });
  }
}

// Controller function to handle retrieving persons by work type
async function handleGetPersonByWorkType(req, res) {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid WorkType (/person/:workType)" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ error: "Internal Server Error (/person/:workType)" });
  }
}

async function handleUpdatePersonById(req, res) {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleDeletePersonById(req, res) {
  try {
    const personId = req.params.id; // Extract the person's ID from the URL parameter

    // Assuming you have a Person model
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data delete");
    res.status(200).json({ message: "person Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewPerson,
  handleLoginPerson,
  handleGetProfile,
  handleGetAllPerson,
  handleGetPersonByWorkType,
  handleUpdatePersonById,
  handleDeletePersonById,
};
