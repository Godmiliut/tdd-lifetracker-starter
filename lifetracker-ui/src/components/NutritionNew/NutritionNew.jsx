import * as React from "react"
import NutritionForm from "components/NutritionForm/NutritionForm"
import { useNutritionContext } from "../../contexts/nutrition"
import "./NutritionNew.css"

export default function NutritionNew() {
    return (
      <div className="nutrition-new">
        <h2>Record Nutrition</h2>
        <NutritionForm />
      </div>
    )
  }