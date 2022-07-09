import * as React from "react"
import apiClient from "../../services/apiClient"
import NutritionCard from "components/NutritionCard/NutritionCard"
import { useNutritionContext } from "../../contexts/nutrition"
import NotFound from "components/NotFound/NotFound"
import { useParams } from "react-router-dom"

export default function NutritionDetail(props) {
    const { nutritionId } = useParams()
    const {setIsLoading, setError, isLoading} = useNutritionContext()
    const [nutrition, setNutrition] = React.useState(null)

    console.log(nutritionId)

    React.useEffect(async () => {
      setIsLoading(true)

      const {data, error} = await apiClient.getNutritionById(nutritionId)

      if(data?.nutrition){
        setNutrition(data.nutrition)
      }
      if(error){
        setError(error)
      }

      setIsLoading(false)

    }, [setIsLoading, setError, setNutrition])

    console.log()
    return (
      <div className="nutrition-detail">
        {nutrition?  <NutritionCard key={nutrition.name} nutrition={nutrition}/> : <NotFound />}
      </div>
    )
  }