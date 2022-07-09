import * as React from "react"
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth"

export default function LoginForm(props) {
  const navigate = useNavigate()

  const { user, setUser } = useAuthContext()
  
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [error, setError] = React.useState("")

  const [form, setForm] = React.useState({ email: "", password: "" })

  React.useEffect(() => {
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate])

  function handleChange(evt){
    setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function loginUser(evt){
    evt.preventDefault()

    setIsProcessing(true)

    if(form.email == "" || form.password == ""){
      setError("Missing an input value")
      return
    }
    else if(form.email.indexOf("@") < 0){
      setError("Please enter a valid email")
      return
    }

    const { data, error } = await apiClient.loginUser({ email: form.email, password: form.password })
    if (data) {
      setUser(data.user)
      apiClient.setToken(data.token)
      setIsProcessing(false)
    }
    if (error) {
      setError((e) => ({ ...e, form: error }))
    }
  }


    return (
      <div className="login-form">
        <div className="input-field">
            <label>Email</label>
            <input className="form-input" type="email" name="email" placeholder="user@gmail.com" defaultValue={form.email} onChange={handleChange}></input>
            {error != ""?  <span className="error">{error}</span>: null}
        </div>
        <div className="input-field">
            <label>Password</label>
            <input className="form-input" name="password" placeholder="password" defaultValue={form.password} onChange={handleChange}></input>
        </div>
        <button className="btn" onClick={loginUser}>Login</button>
      </div>
    )
  }