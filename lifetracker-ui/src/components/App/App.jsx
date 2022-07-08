import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import {  AuthContextProvider, useAuthContext } from "../../contexts/auth"
import apiClient from "../../services/apiClient"

import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "components/LoginPage/LoginPage"
import RegistrationPage from "components/RegistrationPage/RegistrationPage"
import ActivityPage from "components/ActivityPage/ActivityPage"
import NutritionPage from "components/NutritionPage/NutritionPage"
import NutritionOverview from "components/NutritionOverview/NutritionOverview"
import NutritionNew from "components/NutritionNew/NutritionNew"
import NutritionDetail from "components/NutritionDetail/NutritionDetail"
import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import NotFound from "components/NotFound/NotFound"

  export default function AppContainer(){
    return (
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    )
  }

  function App() {
    const [nutritionItems, setNutritionItems] = React.useState([])
    const { user, setUser } = useAuthContext()
    const [error, setError] = React.useState("")
    const [isFetching, setIsFetching] = React.useState(true)


    React.useEffect(() => {
      const getUser = async () =>{
        const { data, error } = await apiClient.fetchUserFromToken()
        if(data){
          setUser(data.user)
        }
        if(error){
          setError(error)
        }
      }
      const token = localStorage.getItem("lifetracker_token")
      if(token){
        apiClient.setToken(token)
        getUser()
      }
    }, [setUser])

   React.useEffect(() => {
    const fetchNutritions = async () => {
      setIsFetching(true)

      const { data, error } = await apiClient.getNutritions()
      if (data) {
        setNutritionItems(data.nutritions)
      }
      if (error) {
        setError(error)
      }

      setIsFetching(false)
    }

    fetchNutritions()
    }, [setNutritionItems])

  

  async function handleLogout(){
    await apiClient.logoutUser()
    setUser({})
    setError(null)
  }

  
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
        <main>
          <Navbar user={user} setUser={setUser} handleLogout={handleLogout}/>
          <Routes>
            <Route path= "/" element= {<LandingPage user={user} error={error} isFetching={isFetching}/>} />
            <Route path= "/login" element= {<LoginPage user={user} setUser={setUser}/>} />
            <Route path= "/register" element= {<RegistrationPage user={user} setUser={setUser}/>} />
            <Route path= "/activity" element= { user?.email ? <ActivityPage isFetching={isFetching} setIsFetching={setIsFetching}  /> : <AccessForbidden />} />
            <Route path= "/nutrition" element= { user?.email ? <NutritionPage nutritionItems={nutritionItems} setNutritionItems={setNutritionItems}/> : <AccessForbidden />} >
              <Route path="/nutrition/" element={<NutritionOverview nutritionItems={nutritionItems} setNutritionItems={setNutritionItems}/>}></Route>
              <Route path="/nutrition/create" element={<NutritionNew nutritionItems={nutritionItems} setNutritionItems={setNutritionItems} error={error} setError={setError} />}></Route>
              <Route path="/nutrition/:nutritionId" element={<NutritionDetail nutritionItems={nutritionItems}/>} />
              <Route path="*" element={<NotFound/>}/>
            </Route>
          </Routes> 
        </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
