import React from 'react'
import soccer from '../assets/soccer.jpg';
import '../styles/signup.css'
function Login() {
  return (
    <div className="form-container">
      <div className="form-img">
        <div className="img-wrapper">
        <img src={soccer} alt="" />
        </div>
      </div>
      <form action="">
        <div className="header-msg">
          <p>
            Don't have an account?
          </p>
          <button className="header-btn">
            Sign Up
          </button>
        </div>
        <div className="heading">
          <h2 className="welcome-msg">
            Welcome to <span>FotIQ</span>
          </h2>
          <p>Sign in to your Account</p>
        </div>
        <div className="input-group">
          <div className="input-item">
            <label htmlFor="">Enter Name</label>
            <input type="text" className="input-box"/>
          </div>
          <div className="input-item">
            <label htmlFor="">Enter Email</label>
            <input type="text" className="input-box"/>
          </div>
          <div className="input-item">
            <label htmlFor="">Enter Password</label>
            <input type="text" className="input-box"/>
          </div>
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  )
}

export default Login