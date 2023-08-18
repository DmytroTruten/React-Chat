import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  // Define a ProtectedRoute component to handle authentication
  const ProtectedRoute = ({ children }) => {
    // If there is no logged-in user, redirect to "/"
    if (!currentUser) {
      return <Navigate to={"/"} />;
    }
    // If there is a logged-in user, render the component
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Define routes for different paths */}
        {/* The path "/" maps to the LogIn component */}
        <Route path="/" element={<LogIn />} />
        {/* The path "/SignUp" maps to the SignUp component */}
        <Route path="/SignUp" element={<SignUp />} />
        {/* The path "/Home" maps to the Home component */}
        {/* Wrap the Home component with the ProtectedRoute component */}
        {/* This ensures that only logged-in users can access the Home component */}
        <Route
          path="/Home"
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
