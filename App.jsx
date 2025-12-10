import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import Data from './pages/Data'

const getAllRecipes = async () => {
  let allRecipes = []
  await axios.get('http://localhost:5000/recipe').then(res => {
    allRecipes = res.data
  })
  return allRecipes
}

const getMyRecipe = async () => {
  // ✅ fixed line below
  const user = JSON.parse(localStorage.getItem("user"))
  if (!user) return []   // handle if no user found (not logged in)

  const allRecipes = await getAllRecipes()
  return allRecipes.filter(item => item.createdBy === user._id)
}

const getFavRecipes=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipe },
      { path: "/favRecipe", element: <Home />, loader:getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      {path:"/recipe/:id",element:<Data/>}
    ]
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
