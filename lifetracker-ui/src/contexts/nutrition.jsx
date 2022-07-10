import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import apiClient from "../services/APIClient"

const NutritionContext = createContext(null)

export const NutritionContextProvider = ({ children }) => {

    const [nutritions, setNutritions] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState({})

    useEffect(() => {

        const fetchUser = async () => {

            const {data, error} = await apiClient.fetchUserFromToken()
    
            if (data) {
                setIsLoggedIn(true)
            }
    
            if (error) {
                setError(error);
            }
        }

        const fetchNutrition = async () => {

            const {data, error} = await apiClient.getNutritions();
    
            if (data) {
                setNutritions(data.nutritions)
            }
    
            if (error) {
                setError(err)
            }
        }
    
          const token = localStorage.getItem("lifetracker_token")

          if (token) {
            apiClient.setToken(token)
            fetchUser()
          }

          if (isLoggedIn) {
              fetchNutrition();
          }

          setInitialized(true)

    }, [isLoggedIn, initialized])

    const nutritionValue = {
        nutritions, 
        setNutritions, 
        error, 
        setError, 
        initialized, 
        setInitialized, 
        isLoading, 
        setIsLoading
    }

    return (
        <NutritionContext.Provider value = { nutritionValue }>
            <>{children}</>
        </NutritionContext.Provider>
    )
}

export const useNutritionContext = () => useContext(NutritionContext)