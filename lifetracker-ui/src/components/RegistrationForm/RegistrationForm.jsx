import * as React from "react"
import apiClient from "../../services/apiClient"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth"

export default function RegistrationForm(props) {

  const { user, setUser } = useAuthContext()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = React.useState(false)
  const [error, setError] = React.useState("")

  const [form, setForm] = React.useState({ "email" : "", "username" : "", "firstName" : "", "lastName" : "", "password" : "", "passwordConfirm" : ""})

  React.useEffect(() => {
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate, setUser])

  function handleChange(evt){
    setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function signupUser(evt){
     evt.preventDefault()

     setIsProcessing(true);

    if(form.email == "" || form.password == "" || form.firstName == "" || form.lastName == "" || form.passwordConfirm == "" || form.username == ""){
      setError("Missing input value")
      return
    }
    else if(form.email.indexOf("@") < 0){
      setError("Invalid email")
      return
    }
    else if(form.password != form.passwordConfirm){
        setError("Passwords don't match")
        return
    }

    const { data, error } = await apiClient.signupUser({ email: form.email, username: form.username, password: form.password, firstName: form.firstName, lastName: form.lastName})
    if(error) setError("Error trying to registrate")
    
    if(data?.user) {
      apiClient.setToken(data.token)
      setUser(data.user)
      navigate("/")
    }

    setIsProcessing(false)
  }

    return (
      <div className="registration-form">
        <div className="input-field">
            <label>Email</label>
            <input className="form-input" type="email" name="email" placeholder="Enter a valid email" onChange={handleChange} defaultValue={form.email}></input>
            {error != "" ?  <span className="error">{error}</span>: null}
        </div>
        <div className="input-field">
            <label>Username</label>
            <input className="form-input" type="text" name="username" placeholder="your_username" onChange={handleChange} defaultValue={form.username}></input>
        </div>
        <div className="split-input-field">
            <div className="input-field">
                <input className="form-input" type="text" name="firstName" placeholder="First Name" onChange={handleChange} defaultValue={form.firstName}></input>
            </div>
            <div className="input-field">
                <input className="form-input" type="text" name="lastName" placeholder="Last Name" onChange={handleChange} defaultValue={form.lastName}></input>
            </div>
        </div>
        <div className="input-field">
            <label>Password</label>
            <input className="form-input" name="password" placeholder="Enter a secure password" onChange={handleChange} defaultValue={form.password}></input>
        </div>
        <div className="input-field">
            <label>Confirm Password</label>
            <input className="form-input" name="passwordConfirm" placeholder="Confirm your password" onChange={handleChange} defaultValue={form.passwordConfirm}></input>
            {error == 3 ?  <span className="error">Passwords don't match</span>: null}
            {error == 0 ?  <span className="error">You're missing an input value</span>: null}
        </div>
        <button className="btn" onClick={signupUser}>Create Account</button>
      </div>
    )
  }