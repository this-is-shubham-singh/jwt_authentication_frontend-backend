import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user_data, set_user_data] = useState("");

  const is_user_loggedin = async () => {
    try {
      const response = await axios.get(`${base_url}/user-authentication`);

      set_user_data(response.data.user_data);

      if (response.data.success == true) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      const err = e.response?.data?.message || e.message;
      console.log(err);

      setIsLoggedIn(false);
      set_user_data(null);
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
      const response = await axios.post(
        `${base_url}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      toast.success(response.data.message);

      return true;
    } catch (e) {
      const res = e.response?.data?.message || e.message;
      toast.error(res);
      setIsLoggedIn(false);
      return false;
    }
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

  const send_reset_pass_otp = async (email) => {
    try {
      const response = await axios.post(`${base_url}/send-reset-otp`, {
        email,
      });

      // storing reset token on session storage
      sessionStorage.setItem("reset-token", response.data.reset_token);

      toast.success(response.data.message);

      return true;
    } catch (e) {
      const res = e.response?.data?.message || e.message;
      toast.error(res);
    }
  };

  const verify_reset_otp = async (otp) => {
    try {
      const reset_token = sessionStorage.getItem("reset-token");
      if (!reset_token) {
        toast.error("token lost! try again");
        return false;
      }

      const response = await axios.post(
        `${base_url}/verify-reset-otp`,
        {
          otp,
        },
        {
          headers: {
            Authorization: `Bearer ${reset_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);

      return true;
    } catch (e) {
      const err = e.response?.data?.message || e.message;
      toast.error(err);
      return false;
    }
  };

  const save_reset_password = async (password) => {
    try {
      const reset_token = sessionStorage.getItem("reset-token");
      if (!reset_token) {
        toast.error("token lost! try again");
        return false;
      }

      const response = await axios.post(
        `${base_url}/save-reset-password`,
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${reset_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);

      return true;
    } catch (e) {
      const err = e.response?.data?.message || e.message;
      toast.error(err);
      return false;
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
    user_data,
    send_reset_pass_otp,
    verify_reset_otp,
    save_reset_password,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext };
export default AppContextProvider;
