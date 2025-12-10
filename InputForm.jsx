import React, { useState } from 'react'
import axios from 'axios'

const InputForm = ({setIsOpen}) => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [isSignUp,setIsSignUp]=useState(false)
    const [error,setError]=useState("");
    

    const handleOnSubmit=async(e)=>{
        e.preventDefault()
        let endpoint=(isSignUp)?"signUp":"login"
        await axios.post(`http://localhost:5000/${endpoint}`,{email,password})
        .then((res)=>{
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            setIsOpen()
        })
         .catch(data=>setError(data.response?.data?.error))
    }

  return (
    <>
    <form className="auth-form" onSubmit={handleOnSubmit}>
    <div className='auth-control'>
        <label>Email</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} className='auth-input' required/>
    </div>

    <div className='auth-control'>
        <label>Password</label>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} className='auth-input' required/>
    </div>
        <button type='submit'>{(isSignUp)?"Sign Up":"Login"}</button>
        { (error!="") && <h6 className='error'>{error}</h6>}
        <p onClick={()=>setIsSignUp(pre=>!pre)}>{(isSignUp)?"Already have an acount":"Create new account"}</p>
    </form>
    </>
  )
}

export default InputForm