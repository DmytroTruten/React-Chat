import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import "./App.css"

function App() {

  return (
    <Routes>
      <Route path='/' element={<LogIn />}/>
      <Route path='/SignUp' element={<SignUp />}/>
    </Routes>
  )
}

export default App
