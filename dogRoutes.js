const express = require('express');
const router = express.Router();

const Dog = require("../models/dog");
const authToken = require('../middleware/middleware');

//Register a new dog
router.post('/register', async (req, res) => {
    try {
        const { name, gender, age, breed, size, personality, energy, goodWith, badWith, location, adoptionAvailability, about, image } = req.body;

        const newDog = new Dog({
            name,
            gender,
            age, 
            breed,
            personality,
            size,
            energy,
            goodWith,
            badWith,
            location,
            adoptionAvailability,
            about,
            image,
        });

        const saved = await newDog.save();

        res.status(201).json(saved);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get all dogs' information
router.get('/', async (req, res) => {
  try {
    const dogs = await Dog.find({});
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get the information of selected dog
router.get("/get/:id", async (req, res) => {
  try {
    const dogToGet = await Dog.findById(req.params.id);

    if (!dogToGet) {
      return res.status(404).json({ message: "Dog not found..." });
    }

    res.status(200).json(dogToGet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update a selected dog's details
router.put("/update/:id", authToken, async (req, res) => {
  try {
    const dogToBeUpdated = await Dog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!dogToBeUpdated) {
      return res.status(404).json({ message: "Dog not found..." });
    }

    res.status(200).json(dogToBeUpdated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete a selected dog
router.delete("/delete/:id", authToken,  async (req, res) => {
  try {
    const dogToBeDeleted = await Dog.findByIdAndDelete(req.params.id);

    if (!dogToBeDeleted) {
      return res.status(404).json({ message: "Dog not found..." });
    }

    res.status(200).json({ message: "Dog deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;