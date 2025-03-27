import React from "react";
import soccer from "../assets/soccer.jpg"
import "../styles/card.css"
function Card() {
  return (
    <div className="card-container">
      <div className="card-img">
        <div className="img-wrapper">
          <img src={soccer} alt="" />
        </div>
      </div>
      
      <div className="quiz-content">
      <h2 className="logo">FotIQ</h2>
        <h3 className="question">
            How many FootBall Clubs did Zlatan Ibrahimovic played in?
        </h3>
        <div className="input-group">
            <div className="choice">
                <input type="radio" name="" id="" />
                <label htmlFor="">Choice 1</label>
            </div>
            <div className="choice">
                <input type="radio" name="" id="" />
                <label htmlFor="">Choice 2</label>
            </div>
            <div className="choice">
                <input type="radio" name="" id="" />
                <label htmlFor="">Choice 3</label>
            </div>
            <div className="choice">
                <input type="radio" name="" id="" />
                <label htmlFor="">Choice 4</label>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
