const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const  Recipe = require("../models/Recipe");
const Users = require("../models/User");
const Ingredients = require("../models/Ingredient");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, "YOUR_SECRET_KEY");
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.post("/createIngredients",  async (req, res) => {
  try {
    
    const { name, description } = req.body;
    const ingredients = await Ingredients.create({ name, description });
    return res.status(201).json({ ingredients });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.post("/createRecipe",  async (req, res) => {
  try {
    
    const { name, description, ingredients } = req.body;
    const recipe = await Recipe.create({ name, description, ingredients });
    return res.status(201).json({ recipe });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});


router.get("/getRecipes", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("ingredients", "name description");
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/getRecipe/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("ingredients", "name description");
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.put("/updateRecipe/:id", verifyToken, async (req, res) => {
  try {
    if (!req.user.admin) {
      return res.status(403).json({ message: "Only admin can update recipes" });
    }
    const { name, description, ingredients } = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { name, description, ingredients },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ recipe: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/deleteRecipe/:id", verifyToken, async (req, res) => {
  try {
    if (!req.user.admin) {
      return res.status(403).json({ message: "Only admin can delete recipes" });
    }
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
