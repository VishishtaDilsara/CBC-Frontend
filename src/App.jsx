import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import Header from "./components/header";
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPasswordPage from "./pages/forgetPassword";

function App() {
  return (
    <GoogleOAuthProvider clientId="105530242300-guvq9f77auv8hq2h7g44n498kn7lvgk1.apps.googleusercontent.com">
      <BrowserRouter>
        <div>
          <Toaster position="top-right" />
          <Routes path="/*">
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forget" element={<ForgetPasswordPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/testing" element={<TestPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
