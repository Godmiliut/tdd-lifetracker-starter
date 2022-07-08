import * as React from "react"
import apiClient from "../../services/apiClient"
import NutritionCard from "components/NutritionCard/NutritionCard"
import NotFound from "components/NotFound/NotFound"
import { useParams } from "react-router-dom"

export default function NutritionDetail(props) {
    const { nutritionId } = useParams()
    const [nutrition, setNutrition] = React.useState({})
    const [error, setEror] = React.useState("")

    async function getNutrition(){
        const {data, err} = await apiClient.getNutritionById(nutritionId)
        if(error){
            setError(error)
            console.log(error)
        }
        if(data){
            setNutrition(data.nutrition)
        }
    }

    React.useEffect(() => {
        getNutrition()
    }, [])

    return (
      <div className="nutrition-detail">
        {nutrition?  <NutritionCard key={nutrition.name} name={nutrition.name} id={nutrition.id} category={nutrition.category} calories={nutrition.calories} quantity={nutrition.quantity} imageUrl={nutrition.imageUrl} createdAt={nutrition.createdAt}/> : <NotFound />}
      </div>
    )
  }