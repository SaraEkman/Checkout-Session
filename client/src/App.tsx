import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import Products from './components/Products'
import { CartProvider } from './context/CardContext'
import { IInputs } from './modules/Types'
import CartDisplay from './components/CartDisplay'


function App() {
  const [user, setUser] = useState<string>("")
  const [showForm, setShowForm] = useState<'login' | 'register' | null>(null);


  useEffect(() => {
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

  const logout = async () => {
    const response = await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include"
    })

    if (response.status === 200) {
      setUser("")
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
    setUser(data.name || data.email);
  };


  return (
    <> <CartProvider>
      <div>
        <h1>{user ? `${user}` : ""}</h1>
        {!user ? (
          <>
            <button onClick={() => handleFormToggle('register')} className={`button button-register ${showForm === 'register' ? 'active' : ''}`}>
              Registrera
            </button>
            <button onClick={() => handleFormToggle('login')} className={`button button-login ${showForm === 'login' ? 'active' : ''}`}>
              Logga in
            </button>
            {showForm && <Form formType={showForm} onFormSubmit={onFormSubmit} />}
          </>
        ) : <>
            <CartDisplay /> 
          <button onClick={logout} className="button logout-button">Logga ut</button>
          <Products />
        </>}
      </div>
    </CartProvider>
    </>
  )
}

export default App
