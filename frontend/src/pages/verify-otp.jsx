import React, { useContext, useState } from "react";
import { AppContext } from "../context/store";
import OTPInput from "react-otp-input";
// import { toast } from "react-toastify";
import Style from "../components/core/login-page/login-page.module.css";
import { apiConnector } from "../service/api-connector";
import { auth } from "../service/api";
import { Link, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const { loginData } = useContext(AppContext);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // ------------------------------- submitting signup data in db -------------------------------

  const handleSubmitUserData = async (e) => {
    e.preventDefault();

    // console.log("signup data: ", signupData);

    const {email, password } = loginData;

    try {
      const response = await apiConnector("POST", auth.SIGN_UP_API, {
        email,
        password,
        otp: otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        console.log("Verify email response : ", response);
        
        navigate("/login");
      }
    } catch (error) {
      console.log("Error in verify email: ", error);
    }
  };

  // -------------------------------------- resend otp --------------------------------------------------
  // const resendOtp = async (e) => {
  //   e.preventDefault();
  //   const { email } = signupData;
  //   const loadingToastId = toast.loading("Sending otp...");

  //   try {
  //     const response = await apiConnector("POST", auth.RESEND_OTP_API, {
  //       email,
  //     });

  //     if (!response.data.success) {
  //       throw new Error(response.data.message);
  //     } else {
  //       // navigate("/verify-email");
  //     }
  //   } catch (error) {
  //     console.log("error in otp form: ", error);
  //   }
  // };

  return (
    <div className={Style.verifyEmail}>
      <div className={Style.verifyEmailHeading}>
        <h1>Verify Email</h1>
        <p>A verification code has been sent to you. Enter the code below</p>
      </div>
      <form action="" onSubmit={(e) => handleSubmitUserData(e)}>
        <OTPInput
          value={otp}
          name={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input {...props} placeholder="-" className={Style.otpInputBox} />
          )}
        />
        <input className="btn" type="submit" value="Verify Email" />
      </form>
      {/* <div className={Style.backToAndResend}>
        <Link to="/register">
          <BiArrowBack />
          Back To Signup
        </Link>
        <button onClick={(e) => resendOtp(e)}>
          <RxCountdownTimer />
          Resend it
        </button>
      </div> */}
    </div>
  );
};

export default VerifyOtp;

// onClick={() => handleResendOTP()}
