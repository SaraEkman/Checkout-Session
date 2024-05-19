import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import { IInputs } from './modules/IInputs'
import Payment from './components/Payment'
import Products from './components/Products'


function App() {
  const [user, setUser] = useState<string>("")
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false)
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false)

  useEffect(() => {
    const authorize = async () => {
      const response = await fetch("http://localhost:3001/api/auth/authorize",
        {
          credentials: "include"
        })

      const data = await response.json()
      if (response.status === 200) {
        setUser(data.email)
      } else {
        setUser("")
      }
    }
    authorize()
  }, [])
  console.log(user)

  const register = async () => {
    setShowRegisterForm(!showRegisterForm)
    setShowLoginForm(false)
  }

  const login = async () => {
    setShowLoginForm(!showLoginForm)
    setShowRegisterForm(false)
  }

  const logout = async () => {
    const response = await fetch("http://localhost:3001/api/auth/logout", {
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
    console.log(inputs)
    if (showRegisterForm) {
      const response = await fetch("http://localhost:3001/api/auth/register", {
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
      const response = await fetch("http://localhost:3001/api/auth/login", {
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

  // const handlePayment = async () => { 
  //   const response = await fetch("http://localhost:3001/payments/create-checkout-session", {
  //     method: "POST",
  //     credentials: "include"
  //   })
  //   const data = await response.json()
  //   console.log(data)
  //   window.location = data.url
  // }


  return (
    <>
      <div>
        <h1>{user ? "INLOGGAD:" + user : "UTLOGGAD"}</h1>

        <button style={
          showRegisterForm ? { backgroundColor: "blue" } : { backgroundColor: "green" }
        } onClick={register}>Registrera</button>

        <button style={showLoginForm ? { backgroundColor: "blue" } : { backgroundColor: "green" }} onClick={login}>Login</button>

        {/* <button type="button" onClick={handlePayment}>Betala</button>
   */}
        <Products />

        <Payment />
        <button onClick={logout}>Logout</button>

        {showRegisterForm ? <Form onClick={onClick} /> : showLoginForm && <Form onClick={onClick} />}

      </div>
    </>
  )
}

export default App
