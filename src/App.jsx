
import './App.css'
import AuthContext from './Context/AuthContext'
import Router from './Router/Router'

function App() {
  
  console.log(import.meta.env.VITE_SOME_KEY)
  return (
    <>
    <AuthContext>
    <Router/>
    </AuthContext>
    </>
  )
}

export default App
