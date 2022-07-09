import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useNutritionContext } from "../../contexts/nutrition"
import apiClient from "../../services/apiClient"
import "./NutritionForm.css"

export default function NutritionForm(props) {
    
    var date = new Date()
    var now = date.toLocaleString();
    
    const {error, isLoading, setIsLoading, nutritions, setError} = useNutritionContext()

    const [form, setForm] = React.useState({ "name" : "" , "calories" : 1, "imageUrl": "", "category": "", "quantity" : 1, "createdAt": `${now}`})

    function handleChange(evt){
        setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
    }

    let navigate = useNavigate();
   
    async function submitNutrition(evt){
        if(form.name == "" || form.imageUrl == "" || form.category == ""){
          props.setError("Missing input value")
          return
        }
        else{
          evt.preventDefault()
          setIsLoading(true)
          const { data, error } = await apiClient.createNutrition({ name: form.name, calories: form.calories, imageUrl: form.imageUrl, category: form.category, quantity: form.quantity, createdAt: form.createdAt})
          console.log
          if (error) setError("Something went wrong")
          if(data){
            navigate("/nutrition")
          }
          setIsLoading(false);
        }
      }

    return (
      <div className="nutrition-form">
        <div className="input-field">
            <label>Name</label>
            <input className="form-input" type="text" name="name" placeholder="Nutrition name" defaultValue={form.name} onChange={handleChange}></input>
        </div>
        <div className="input-field">
            <label>Category</label>
            <input className="form-input" name="category" placeholder="Nutrition category" defaultValue={form.category} onChange={handleChange}></input>
        </div>
        <div className="split-input-field">
            <div className="input-field">
                <label>Quantity</label>
                <input className="form-input" type="number" name="quantity" min="1" max="1000000000" defaultValue={form.quantity} onChange={handleChange}></input>
            </div>
            <div className="input-field">
                <label>Calories</label>
                <input className="form-input" type="number" name="calories" min="0" max="1000000000" step="10" defaultValue={form.calories} onChange={handleChange}></input>
            </div>
        </div>
        <div className="input-field">
            <label>Image URL</label>
            <input className="form-input" type="text" name="imageUrl" placeholder="http://www.food-image.com/1" defaultValue={form.imageUrl} onChange={handleChange}></input>
            {props.error != "" ?  <span className="error">{props.error}</span>: null}
        </div>
        <button className="submit-nutrition" onClick={submitNutrition}>Save</button>
      </div>
    )
  }