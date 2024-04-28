import Header from "./components/header/Header";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Home from "./components/Home";
import AddNote from "./components/AddNote";
import ShowNote from "./components/ShowNote";
import EditNote from "./components/EditNote";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/show-note" element={<ShowNote />} />
          <Route path="/logout" element={<h1>logout</h1>} />
          <Route path="/update-note/:id" element={<EditNote />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
