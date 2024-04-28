import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import { IInputs } from './modules/IInputs'
import Payment from './components/Payment'

function App() {
  const [user, setUser] = useState<string>("")
  const [showRegisterForm,  setShowRegisterForm] = useState<boolean>(false)
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false)

  useEffect(() => {
    const authorize = async () => {
      const response = await fetch("http://localhost:3000/api/auth/authorize", {
        credentials: "include"
      })

      const data = await response.json()
      if (response.status === 200) {
        setUser(data)
      } else {
        setUser("")
      }
    }
    authorize()
  }, [])
  console.log(user)

  const register = async () => {
    setShowRegisterForm(!showRegisterForm)
  }

  const login = async () => {
    setShowLoginForm(!showLoginForm)
  }

  const logout = async () => {
    const response = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include"
    })

    if (response.status === 200) {
      setUser("")
    }
    setShowLoginForm(false)
    setShowRegisterForm(false)
  }

  const onClick = async (inputs: IInputs) => {
    if (showRegisterForm) {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      })
      const data = await response.json()
      console.log(data)
      setShowRegisterForm(false)
    } else if (showLoginForm) {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(inputs)
      })
      const data = await response.json()

      if (response.status === 200) {
        setUser(data)
      } else {
        setUser("")
      }
    }
    setShowLoginForm(false)
    
  }

  const handlePayment = async () => { 
    const response = await fetch("http://localhost:3000/payments/create-checkout-session", {
      method: "POST",
      credentials: "include"
    })
    const data = await response.json()
    console.log(data)
  }


  return (
    <>
      <div>
        <h1>{user ? "INLOGGAD:" + user : "UTLOGGAD"}</h1>

        <button style={
          showRegisterForm ? {backgroundColor: "blue"} : {backgroundColor: "black"}
        } onClick={register}>Registrera</button>
        
        <button style={showLoginForm ? { backgroundColor: "blue" } : { backgroundColor: "black" }} onClick={login}>Login</button>
        
        <button type="button" onClick={handlePayment}>Betala</button>
  
        <button onClick={logout}>Logout</button>

        {showRegisterForm ? <Form onClick={onClick} /> : showLoginForm && <Form onClick={onClick} />}
        
        <Payment />
      </div>
    </>
  )
}

export default App
