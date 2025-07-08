import Login from "./pages/Login";
import Home from "./pages/Home";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuestRoute from "./components/GuestRoute.jsx";

const App = () => {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/email-verify" element={<EmailVerify />} />

        {/* these are protected routes  */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
