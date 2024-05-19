import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import Payment from './components/Payment'
import Products from './components/Products'


function App() {
  const [user, setUser] = useState({
    email: "",
    customerId: 0, 
  })
  const [showForm, setShowForm] = useState<'login' | 'register' | null>(null);


  useEffect(() => {
    const authorize = async () => {
      const response = await fetch("http://localhost:3001/api/auth/authorize",
        {
          credentials: "include"
        })

      const data = await response.json()
      if (response.status === 200) {
        setUser(data)
      } else {
        setUser({ email: "", customerId: 0 })
      }
    }
    authorize()
  }, [])
  console.log(user)

  const logout = async () => {
    const response = await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include"
    })

    if (response.status === 200) {
      setUser({ email: "", customerId: 0 })
    }
    setShowForm(null);
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

  const handleFormToggle = (formType: 'login' | 'register') => {
    if (user.email) {
      return; // If the user is logged in, do not toggle forms
    }
    setShowForm(prevState => prevState === formType ? null : formType);
  };


  return (
    <>
       <div>
        <h1>{user.email ? `INLOGGAD: ${user.email}` : "UTLOGGAD"}</h1>         
        {!user.email ? (
          <>
            <button onClick={() => handleFormToggle('register')} className={`button button-register ${showForm === 'register' ? 'active' : ''}`}>
              Registrera
            </button>
            <button onClick={() => handleFormToggle('login')} className={`button button-login ${showForm === 'login' ? 'active' : ''}`}>
              Login
            </button>
            {showForm && <Form formType={showForm} onFormSubmit={setUser} />}
          </>
        ) : <>
            <button onClick={logout} className="button logout-button">Logout</button>
        <Products />
        <Payment />
        </>}
      </div>
    </>
  )
}

export default App
