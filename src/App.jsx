import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import "./App.css"

function App() {

  return (
    <Routes>
      <Route path='/' element={<LogIn />}/>
      <Route path='/SignUp' element={<SignUp />}/>
      <Route path='/Home' element={<Home />} />
    </Routes>
  )
}

export default App
