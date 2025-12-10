import React, { useEffect, useState } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { FaClock } from "react-icons/fa6";
import { IoHeartSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const RecipeItem = () => {

    const recipes = useLoaderData()
    const [allRecipes, setAllRecipes] = useState([])
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavRecipe, setIsFavRecipe] = useState(false)
    let path = window.location.pathname === "/myRecipe" ? true : false;

    useEffect(() => {
        setAllRecipes(recipes)
    }, [recipes])

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/recipe/${id}`)
            .then((res) => {
                console.log(res)
                setAllRecipes(prev => prev.filter(item => item._id !== id))
                localStorage.setItem("fav", JSON.stringify(filterItem))
            })
            .catch((err) => console.log(err))
    }

    const favRecipe = (item) => {
        let filterItem = favItems.filter(recipe => recipe._id !== item._id)
        favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 ? [...favItems, item] : filterItem
        localStorage.setItem("fav", JSON.stringify(favItems))
        setIsFavRecipe(pre => !pre)
    }

    return (
        <>
            <div className='card-container'>
                {
                    allRecipes?.map((item, index) => (
                        <div key={index} className='card'>
                            <Link to={`/recipe/${item._id}`}>
                            <img
                            src={`http://localhost:5000/images/${item.coverImage}`}
                            alt="dish_image"
                            className="card-image"
                            />
                            </Link>
                            <div className='card-content'>
                                <h3 className='card-title'>{item.title}</h3>
                                <div className='card-icons'>
                                    <div className='time'>
                                        <FaClock className='icon' /> {item.time}
                                    </div>
                                    {
                                        !path ? (
                                            <IoHeartSharp
                                                onClick={(()=>favRecipe(item))}
                                                className='heart-icon'
                                                style={{ color: favItems.some(res => res._id === item._id) ? "green" : "" }}

                                            />
                                        ) : (
                                            <div className='action'>
                                                <Link to={`/editRecipe/${item._id}`}>
                                                    <FaRegEdit className="editIcon" />
                                                </Link>
                                                <MdDelete
                                                    onClick={() => onDelete(item._id)}
                                                    className='deleteIcon'
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default RecipeItem
