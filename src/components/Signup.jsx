import React, {useState } from "react";
import '../styles/signup.css';
import soccer from '../assets/soccer.jpg'
import { signup } from "../utils/auth";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = async(e) => {
      e.preventDefault();

      try{
        if(email && password){
          await signup(email, password)
          alert("User is successfully registered")
        }
       
      }
      catch(e){
        setError("Something went wrong")
      }
  }
  return (
    <div className="form-container">
      <div className="form-img">
        <div className="img-container">
        <img src={soccer} alt="" />
        </div>
      </div>
      <form action="" onSubmit={handleSignup}>
        <div className="header-msg">
          <p>
            Already have an account?
          </p>
          <button className="header-btn">
            Login
          </button>
        </div>
        <div className="heading">
          <h2 className="welcome-msg">
            Welcome to <span>FotIQ</span>
          </h2>
          <p>Register your Account</p>
        </div>
        <div className="input-group">
          {/* <div className="input-item">
            <label htmlFor="">Enter Name</label>
            <input type="text" className="input-box" value={userName} onChange={(e) => setUserName(e.target.value)}/>
          </div> */}
          <div className="input-item">
            <label htmlFor="">Enter Email</label>
            <input type="text" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-item">
            <label htmlFor="">Enter Password</label>
            <input type="password" className="input-box" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>
        <input type="submit" className="submit-btn" value="Signup"/>
      </form>
    </div>
  );
}

export default Signup;
