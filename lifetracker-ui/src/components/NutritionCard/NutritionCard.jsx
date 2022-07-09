import * as React from "react"
import "./NutritionCard.css"

export default function NutritionCard(props) {
  console.log(props)
    return (
      <div className="nutrition-card">
        <div className="card-header">
            <img src={props.nutrition.image_url} alt="nutrition"></img>
            <h2 className="title">{props.nutrition.name}</h2>
        </div>
        <div className="card-stats">
          <div className="card-stat">
            <p>Calories</p>
            <span>{props.nutrition.calories}</span>
          </div>
          <div className="card-stat">
            <p>Quantity</p>
            <span>{props.nutrition.quantity}</span>
          </div>
        </div>
        <div className="card-meta">
            <small>{props.nutrition.created_at}</small>
            <small className="category">{props.nutrition.category}</small>
          </div>
      </div>
    )
  }