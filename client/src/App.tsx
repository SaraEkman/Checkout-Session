import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import Payment from './components/Payment'
import Products from './components/Products'
import { CartProvider } from './context/CardContext'
import { IInputs } from './modules/Types'


function App() {
  const [user, setUser] = useState<IInputs | null>(null);
  const [showForm, setShowForm] = useState<'login' | 'register' | null>(null);


  useEffect(() => {
    console.log("useEffect", user)
    const authorize = async () => {
      const response = await fetch("http://localhost:3001/api/auth/authorize",
        {
          credentials: "include"
        })

      const data = await response.json()
      if (response.status === 200) {
        setUser(data)
      } else {
        setUser(null)
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
      setUser(null)
      localStorage.removeItem("customerId")
      localStorage.removeItem("sessionId")
      localStorage.removeItem("address")
    }
    setShowForm(null);
  }

  const handleFormToggle = (formType: 'login' | 'register') => {
    if (user && user.email) {
      return; 
    }
    setShowForm(prevState => prevState === formType ? null : formType);
  };


  return (
    <> <CartProvider>
      <div>
        <h1>{user && user.email ? `INLOGGAD: ${user.email}` : "UTLOGGAD"}</h1>
        {!user ? (
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
    </CartProvider>
    </>
  )
}

export default App
