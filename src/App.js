import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import Navbar from "./layout/Navbar.jsx";
import NotFound from "./pages/NotFound.jsx";
import Books from "./pages/Books.jsx";

function App() {
  return (
    <div className="App bg">
      <div className="container h-100  ">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <Books />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
