import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import {  AuthContextProvider, useAuthContext } from "../../contexts/auth"
import { NutritionContextProvider } from "../../contexts/nutrition"

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
        <NutritionContextProvider>
          <App />
        </NutritionContextProvider>
      </AuthContextProvider>
    )
  }

  function App() {

    const { user } = useAuthContext()

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
        <main>
          <Navbar />
          <Routes>
            <Route path= "/" element= {<LandingPage />} />
            <Route path= "/login" element= {<LoginPage />} />
            <Route path= "/register" element= {<RegistrationPage />} />
            <Route path= "/activity" element= { user?.email ? <ActivityPage   /> : <AccessForbidden />} />
            <Route path= "/nutrition" element= { user?.email ? <NutritionPage/> : <AccessForbidden />} >
              <Route path="/nutrition/" element={<NutritionOverview />}></Route>
              <Route path="/nutrition/create" element={<NutritionNew />}></Route>
              <Route path="/nutrition/:nutritionId" element={<NutritionDetail />} />
              <Route path="*" element={<NotFound/>}/>
            </Route>
          </Routes> 
        </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
