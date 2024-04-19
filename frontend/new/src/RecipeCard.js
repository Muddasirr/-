import React from 'react';
import './RecipeCard.css'; // Import your CSS file

const RecipeCard = ({ name, description, ingredients }) => {
  
  return (
    <div className="recipe-card">
      <h3 className="recipe-name">{name}</h3>
      <p className="recipe-description">{description}</p>
      <div className="ingredients-list">
        <h4>Ingredients:</h4>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCard;
