import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth"
import apiClient from "../../services/apiClient"
import "./NutritionForm.css"

export default function NutritionForm(props) {
    var date = new Date()
    var now = date.toLocaleString();
    var day = now.substring(0,8);
    
    const [form, setForm] = React.useState({ "name" : "" , "calories" : 1, "imageUrl": "", "category": "", "quantity" : 1, "createdAt": `${now}`})
    const [caloriesPerDay, setCaloriesPerDay] = React.useState({"date": `${day}`, "calories" : 1})
    const [isLoading, setIsLoading] = React.useState()
    const [error, setError] = React.useState()

    function handleChange(evt){
        setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
    }

    let navigate = useNavigate();

     /*function handleDays(calories){
      
      let temp = [...props.totalCaloriesPerDay]
      let alreadyThere = false;
      if(temp.length > 0){
        let i = 0;
        while(i < temp.length && alreadyThere == false){
          if(temp[i].date == caloriesPerDay.date){
            let newTotal = Number(temp[i].calories) + Number(nutritionForm.calories);
            temp[i] = {
              date: day,
              calories: newTotal
            }
            props.setTotalCaloriesPerDay(temp)
            alreadyThere = true;
          }
          i++;
        }
      }
      if(alreadyThere == false){
        props.setTotalCaloriesPerDay((f) => ([...f, caloriesPerDay]))
      }

    }*/
   
    async function submitNutrition(evt){
        if(form.name == "" || form.imageUrl == "" || form.category == ""){
          setError("Missing input value")
          return
        }
        else{
          evt.preventDefault()
          setIsLoading(true)

          const { data, error } = await apiClient.createNutrition({ name: form.name, calories: form.calories, imageUrl: form.imageUrl, category: form.category, quantity: form.quantity, createdAt: form.createdAt})
          console.log(data)
          if (error) setError("Something went wrong")
          if(data){
            props.setNutritionItems( f => [...f, data.nutrition])
            console.log(data.nutrition)
            setForm({ "name" : "" , "calories" : 1, "imageUrl": "", "category": "", "quantity" : "", "createdAt" : ""})
            setError("")
            navigate("/nutrition")
          }

          //handleDays(nutritionForm.calories)
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
            {error != "" ?  <span className="error">{error}</span>: null}
        </div>
        <button className="submit-nutrition" onClick={submitNutrition}>Save</button>
      </div>
    )
  }