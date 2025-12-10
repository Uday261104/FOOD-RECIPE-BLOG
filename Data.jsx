import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Data = () => {
  const [recipe, setRecipe] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/recipe/${id}`)
        setRecipe(res.data)
      } catch (err) {
        console.error('Error fetching recipe:', err)
      }
    }
    fetchRecipe()
  }, [id])

  // 🧠 Handle ingredients safely
  const renderIngredients = () => {
    const { ingredients } = recipe

    if (!ingredients) {
      return <li>No ingredients available</li>
    }

    if (Array.isArray(ingredients)) {
      return ingredients.map((ing, i) => <li key={i}>{ing}</li>)
    }

    if (typeof ingredients === 'string') {
      return ingredients.split(',').map((ing, i) => <li key={i}>{ing.trim()}</li>)
    }

    // In case backend sends something else (like object)
    return <li>Invalid ingredient format</li>
  }

  return (
    <>
      <div className="recipe-container">
        <img
          src={`http://localhost:5000/images/${recipe.coverImage || 'default.png'}`}
          alt="dish"
          className="card-image"
        />

        <div className="recipe-details">
          <div className="left">
            <h4>Ingredients</h4>
            <ul>{renderIngredients()}</ul>
          </div>

          <div className="right">
            <h4>Instructions</h4>
            <p>{recipe.instructions || 'No instructions available'}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Data

