
import { Toaster } from 'react-hot-toast'
import './App.css'
import AuthContext from './Context/AuthContext'
import Router from './Router/Router'

function App() {

  console.log(import.meta.env.VITE_SOME_KEY)
  
  console.log(import.meta.env.VITE_apiKey);
  return (
    <>
      <AuthContext>
        <Router />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </AuthContext>
    </>
  )
}

export default App
