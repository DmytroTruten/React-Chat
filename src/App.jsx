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
    // If there is no logged-in user, redirect to "/React-Chat"
    if (!currentUser) {
      return <Navigate to={"/React-Chat"} />;
    }
    // If there is a logged-in user, render the component
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Define routes for different paths */}
        {/* The path "/React-Chat" maps to the LogIn component */}
        <Route path="/React-Chat" element={<LogIn />} />
        {/* The path "/React-Chat/SignUp" maps to the SignUp component */}
        <Route path="/React-Chat/SignUp" element={<SignUp />} />
        {/* The path "/React-Chat/Home" maps to the Home component */}
        {/* Wrap the Home component with the ProtectedRoute component */}
        {/* This ensures that only logged-in users can access the Home component */}
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
