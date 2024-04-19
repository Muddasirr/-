import React from 'react';
import RecipeCard from './RecipeCard'; 
import './All.css';
import { useEffect, useState } from 'react';
const All = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
  fetch('http://localhost:3000/recipe/getRecipes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming the response is JSON data
      })
      .then(data => {
        console.log(data);
        setOrders(data);
        console.log(orders); // Process the JSON data
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);
  
  const recipes = [
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish with eggs, cheese, and pancetta.',
      ingredients: ['Spaghetti', 'Eggs', 'Parmesan Cheese', 'Pancetta', 'Black Pepper'],
    },
    {
      id: 2,
      name: 'Chicken Tikka Masala',
      description: 'A flavorful Indian curry dish with marinated chicken in a creamy tomato sauce.',
      ingredients: ['Chicken', 'Yogurt', 'Tomato Sauce', 'Spices', 'Cream'],
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'A refreshing salad with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.',
      ingredients: ['Romaine Lettuce', 'Croutons', 'Parmesan Cheese', 'Caesar Dressing'],
    },
  ];

  return (
    <div className="app">
      <h1>Recipes</h1>
      <div className="recipe-list">
        {orders.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            name={recipe.name}
            description={recipe.description}
            ingredients={recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default All;
