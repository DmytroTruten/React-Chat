import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/React-Chat"} />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/React-Chat" element={<LogIn />} />
        <Route path="/React-Chat/SignUp" element={<SignUp />} />
        <Route
          path="/React-Chat/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
