import { Route, Routes } from "react-router";
import App from "../App";
import About from "../pages/page/About";
import Contact from "../pages/page/Contact";
import RootLayout from "../component/Layout/RootLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../component/Layout/ProtectedRoute";
import DashLayout from "../component/Layout/DashLayout";

export default function RouterItem() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path="home" element={<App />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="/dashboard" element={<DashLayout />}>
          <ProtectedRoute role="ADMIN">
            <Route path="about" element={<About />} />
          </ProtectedRoute>

        </Route>
      </Route>
    </Routes>
  );
}
