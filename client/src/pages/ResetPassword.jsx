import { useContext, useRef, useState } from "react";
import "../App.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();

  const { send_reset_pass_otp, verify_reset_otp, save_reset_password } =
    useContext(AppContext);

  const [email, setEmail] = useState("");
  const otpContainer = useRef([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams, setSearchParam] = useSearchParams();
  const step = searchParams.get("step") || "email";

  async function emailSubmit() {
    // call the api
    if (!email) {
      return toast.warning("enter email");
    }

    const response = await send_reset_pass_otp(email);

    if (response == true) {
      toast.success("otp sent to mail");
      setSearchParam({ step: "otp" });
    }
  }

  async function otpSubmit() {
    // call the api

    let otp = "";

    for (let i = 0; i < 6; i++) {
      otp += otpContainer.current[i].value;
      otpContainer.current[i].value = "";
    }

    if (otp.length != 6) {
      toast.warning("enter complete otp");
      return false;
    }

    const response = await verify_reset_otp(otp);

    if (response == true) {
      toast.success("opt verified");
      setSearchParam({ step: "newPassword" });
    }
  }

  async function newPasswordSubmit() {
    // call the api

    if (!newPassword || !confirmPassword) {
      toast.warning("enter password");
      return;
    } else if (newPassword != confirmPassword) {
      toast.warning("password doesnot match");
      return;
    }

    const response = await save_reset_password(newPassword);

    if (response == true) {
      toast.success("password change !login now");
      navigate("/login");
    }
  }

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

  return (
    <div className="reset-container">
      {/* Reset Password Email Box */}

      {step == "email" && (
        <div className="reset-box">
          <h2 className="reset-heading">Reset Password</h2>
          <p className="reset-text">Enter your registered email address.</p>
          <input
            type="email"
            placeholder="Email Address"
            className="reset-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="reset-button" onClick={() => emailSubmit()}>
            Submit
          </button>
        </div>
      )}

      {step == "otp" && (
        <div className="verify-box">
          <h2 className="verify-heading">Email Verify OTP</h2>
          <p className="verify-text">
            Enter 6-digit code sent to your emailid.
          </p>

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

          <button className="verify-button" onClick={otpSubmit}>
            Verify Email
          </button>
        </div>
      )}

      {step == "newPassword" && (
        <div className="reset-box">
          <h2 className="reset-heading">New Password</h2>
          <p className="reset-text">Enter new password.</p>
          <input
            type="password"
            placeholder="New Password"
            className="reset-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="reset-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="reset-button" onClick={() => newPasswordSubmit()}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
