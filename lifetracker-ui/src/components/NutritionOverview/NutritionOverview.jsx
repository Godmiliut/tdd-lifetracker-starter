import * as React from "react"
import { Link } from "react-router-dom"
import apiClient from "../../services/apiClient"
import NutritionCard from "components/NutritionCard/NutritionCard";
import { useNutritionContext } from "../../contexts/nutrition"
import "./NutritionOverview.css"

export default function NutritionOverview(props) {
    const {nutritions, setNutritions} = useNutritionContext()

    React.useEffect(() => {
        const fetchNutritions = async () => {
            const { data, error } = await apiClient.getNutritions()
            setNutritions(data?.nutritions)
        }

        fetchNutritions()

    }, [nutritions])
    console.log(nutritions)
    return (
        <div className="nutrition-overview">
            <div className="header">
                <h3>Overview</h3>
                <Link to="/nutrition/create"><button className="Button outline small outline aqua">Record Nutrition</button></Link>
            </div>
            <div className="feed">
                {nutritions.map((item, index) => (<Link to={`/nutrition/${item.id}`}><NutritionCard key={index} nutrition={item}/></Link>))}
            </div>
        </div>
    )
  }
