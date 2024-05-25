import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import Payment from './components/Payment'
import Products from './components/Products'
import { CartProvider } from './context/CardContext'
import { IInputs } from './modules/Types'


function App() {
  const [user, setUser] = useState<string>("")
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
        setUser(data.name || data.email)
      } else {
        setUser("")
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
      setUser("")
      localStorage.removeItem("customerId")
      localStorage.removeItem("sessionId")
      localStorage.removeItem("data")
    }
    setShowForm(null);
  }

  const handleFormToggle = (formType: 'login' | 'register') => {
    if (user) {
      return; 
    }
    setShowForm(prevState => prevState === formType ? null : formType);
  };

  const onFormSubmit = (data: IInputs) => {
    console.log("onFormSubmit", data)
    setUser(data.name || data.email);
  };


  return (
    <> <CartProvider>
      <div>
        <h1>{user  ? `INLOGGAD: ${user}` : "UTLOGGAD"}</h1>
        {!user ? (
          <>
            <button onClick={() => handleFormToggle('register')} className={`button button-register ${showForm === 'register' ? 'active' : ''}`}>
              Registrera
            </button>
            <button onClick={() => handleFormToggle('login')} className={`button button-login ${showForm === 'login' ? 'active' : ''}`}>
              Login
            </button>
            {showForm && <Form formType={showForm} onFormSubmit={onFormSubmit} />}
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
