import React, { useRef } from "react";
import "../App.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EmailVerify() {
  const { verify_user_account } = useContext(AppContext);
  const otpContainer = useRef([]);
  const navigate = useNavigate();

  function otpValue(e, index) {
    console.log(e.key);

    if (e.key == "Backspace") {
      e.preventDefault();
      otpContainer.current[index].value = "";

      if (index > 0) {
        otpContainer.current[index - 1].focus();
      }

      return;
    }

    if (e.key == "ArrowLeft") {
      if (index > 0) {
        otpContainer.current[index - 1].focus();
      }
    }

    if (e.key == "ArrowRight") {
      if (index < 5) {
        otpContainer.current[index + 1].focus();
      }
    }

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    otpContainer.current[index].value = e.key;

    if (index < 5) {
      otpContainer.current[index + 1].focus();
    }
  }

  const handle_verify_email = async () => {
    let otp = "";

    for (let i = 0; i < 6; i++) {
      otp += otpContainer.current[i].value;
      otpContainer.current[i].value = "";
    }

    const response = await verify_user_account(otp);

    if (response == true) {
      toast.success("user verified successfully");
      navigate("/");
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-box">
        <h2 className="verify-heading">Email Verify OTP</h2>
        <p className="verify-text">Enter 6-digit code sent to your emailid.</p>

        <div className="otp-boxes">
          {Array.from({ length: 6 }).map((value, index) => {
            return (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(curr) => (otpContainer.current[index] = curr)}
                className="otp-input"
                onKeyDown={(e) => otpValue(e, index)}
              />
            );
          })}
        </div>

        <button className="verify-button" onClick={() => handle_verify_email()}>
          Verify Email
        </button>
      </div>
    </div>
  );
}

export default EmailVerify;
