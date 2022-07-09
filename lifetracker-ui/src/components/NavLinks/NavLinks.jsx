import * as React from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth"

export default function NavLinks(props) {

   const { user, logoutUser } = useAuthContext()

    return (
     <ul className="links">
        <li><Link to="/activity">Activity</Link></li>
        <li><Link to="/nutrition">Nutrition</Link></li>
        <li>{ user?.email ? <Link to="/"><button className="logout-button" onClick={logoutUser}>Logout</button></Link> : <Link to="/login">Login</Link>}</li>
        {user?.email ?
        null
        :
        <li className="btn"><Link to="/register">Sign Up</Link></li>
        }
     </ul>
    )
  }