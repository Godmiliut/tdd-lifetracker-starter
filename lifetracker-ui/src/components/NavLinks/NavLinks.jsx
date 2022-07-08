import * as React from "react"
import { Link } from "react-router-dom"

export default function NavLinks(props) {
    return (
     <ul className="links">
        <li><Link to="/activity">Activity</Link></li>
        <li><Link to="/nutrition">Nutrition</Link></li>
        <li>{ props.user?.email ? <Link to="/"><button className="logout-button" onClick={props.handleLogout}>Logout</button></Link> : <Link to="/login">Login</Link>}</li>
        {props.user?.email ?
        null
        :
        <li className="btn"><Link to="/register">Sign Up</Link></li>
        }
     </ul>
    )
  }