const mongoose=require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }] // Reference to Ingredient model
  });



const Recipe= mongoose.model('Recipe',RecipeSchema)
module.exports=Recipe;