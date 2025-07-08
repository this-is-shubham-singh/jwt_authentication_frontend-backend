import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ResetPassword from "../pages/ResetPassword";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const is_user_loggedin = async () => {
    try {
      const response = await axios.get(`${base_url}/user-authentication`);

      if (response.data.success == true) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      const err = e.response?.data?.message || e.message;
      console.log(err);
    }
  };

  useEffect(() => {
    is_user_loggedin();
  }, []);

  const create_user = async (name, email, password) => {
    try {
      const response = await axios.post(`${base_url}/create-user`, {
        name,
        email,
        password,
      });
      toast.success(response.data.message);
      return true;
    } catch (e) {
      const response = e.response?.data?.message || e.message;
      toast.error(response);
    }
  };

  const login_user = async (email, password) => {
    try {
      const response = await axios.post(`${base_url}/login`, {
        email,
        password,
      });

      toast.success(response.data.message);

      return true;
    } catch (e) {
      const res = e.response?.data?.message || e.message;
      toast.error(res);
    }
    return false;
  };

  const user_logout = async () => {
    try {
      const response = await axios.get(`${base_url}/logout`);
      setIsLoggedIn(false);
      toast.success(response.data.message);

      return true;
    } catch (e) {
      const res = e.response?.data?.message || e.message;
      toast.error(res);
    }
  };

  const send_verify_otp = async () => {
    try {
      const response = await axios.post(`${base_url}/send-verify-otp`);
      console.log(response)
      toast.success(response.data.message);

      return true;
    } catch (e) {
      const res = e.response?.data?.message || e.message;
      toast.error(res);
    }
  };

  const verify_user_account = async (otp) => {
    try {
      const response = await axios.post(`${base_url}/verify-account`, {
        otp,
      });

      toast.success(response.data.message);

      return true;
    } catch (e) {
      const err = e.response?.data?.message || e.message;
      toast.error(err);
    }
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    create_user,
    login_user,
    user_logout,
    send_verify_otp,
    verify_user_account,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext };
export default AppContextProvider;
