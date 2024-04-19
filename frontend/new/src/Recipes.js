import React, { useState } from 'react';
import './Recipes.css'; // Import your CSS file

const AddRecipeForm = ({ onAddRecipe }) => {
  const [csvData, setCSVData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvText = e.target.result;
      const rows = csvText.split('\n').map(row => row.split(','));
      setCSVData(rows);
    };

    reader.readAsText(file);}
  const [recipeName, setRecipeName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = () => {
    if (ingredient.trim() !== '') {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleAddRecipe = () => {
    if (recipeName.trim() !== '' && ingredients.length > 0) {
      const newRecipe = {
        name: recipeName.trim(),
        ingredients: ingredients,
      };
      onAddRecipe(newRecipe);
      setRecipeName('');
      setIngredients([]);
    }
  };

  return (
    <div className="add-recipe-form">
      <h2>Add Recipe</h2>
      <label htmlFor="recipeName">Recipe Name:</label>
      <input
        type="text"
        id="recipeName"
        className="input-field"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <label htmlFor="ingredient">Ingredients:</label>
      <div className="ingredient-input">
        <input
          type="text"
          id="ingredient"
          className="input-field"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button className="add-button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </div>
      <ul className="ingredient-list">
        {ingredients.map((item, index) => (
          <li key={index}>
            {item}
            <button className="remove-button" onClick={() => handleRemoveIngredient(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button className="add-recipe-button" onClick={handleAddRecipe}>
        Add Recipe
      </button>
    </div>
  );
};

export default AddRecipeForm;
