import React, { useRef } from "react";
import "../App.css";

function EmailVerify() {
  const otpContainer = useRef([]);

  function otpValue(e, index) {
    console.log(e.key);

    if(e.key == "Backspace") {
      otpContainer.current[index].value = "";

      if(index > 0) {
         otpContainer.current[index - 1].focus();
      }

      return;
    }

    if(isNaN(e.key)) {
      return;
    }

    otpContainer.current[index].value = e.key;

    if (index < 5) {
      otpContainer.current[index + 1].focus();
    }
  }

  return (
    <div className="verify-container">
      <div className="verify-box">
        <h2 className="verify-heading">Email Verify OTP</h2>
        <p className="verify-text">Enter 6-digit code sent to your emailid.</p>

        <div className="otp-boxes">
          {Array.from({ length: 6 }).map((value, index) => {
            return (
              <input
                type="text"
                maxLength="1"
                ref={(curr) => (otpContainer.current[index] = curr)}
                className="otp-input"
                onKeyDown={(e) => otpValue(e, index)}
              />
            );
          })}
        </div>

        <button className="verify-button">Verify Email</button>
      </div>
    </div>
  );
}

export default EmailVerify;
