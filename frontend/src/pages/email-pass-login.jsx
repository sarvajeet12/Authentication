import React, { useContext, useEffect, useState } from 'react'
import Style from "../components/core/login-page/login-page.module.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/store';
import { auth } from '../service/api';
import { apiConnector } from '../service/api-connector';

const EmailPassLogin = () => {

    const { saveLoginData } = useContext(AppContext)
    const navigate = useNavigate()

    // // data store
    const [userLoginData, setUserLoginData] = useState({
        email: "",
        password: "",
    });

    // for checking email present or not
    const [userDetails, setUserDetails] = useState([]);
    const [userGoogleDetails, setUserGoogleDetails] = useState([])

    // // get Data
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserLoginData({
            ...userLoginData,
            [name]: value,
        });
    };

    // check email exists or not  in user model and google model
    const checkUserEmail = async () => {
        try {

            const response = await apiConnector("GET", auth.GET_ALL_USER_API);

            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                console.log("Login Response user : ", response.data.response);
                setUserDetails(response.data.response)

            }
        } catch (error) {
            console.log("all user email error", error)
        }
    }

    // google part
    const checkUserGoogleEmail = async () => {
        try {

            const response = await apiConnector("GET", auth.GOOGLE_ALL_USERS_API);

            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                console.log("Login Response google user: ", response.data.response);
                setUserGoogleDetails(response.data.response)

            }
        } catch (error) {
            console.log("all user email error", error)
        }
    }

    useEffect(() => {
        checkUserEmail()
        checkUserGoogleEmail();
    }, [])



    // ------------- handle data
    const handleUserLoginFormData = async (e) => {
        e.preventDefault();

        // checking email present or not
        const isEmailPresent = userDetails.includes(userLoginData.email);
        const isEmailPresentGoogle = userGoogleDetails.includes(userLoginData.email);
        console.log("present or not", isEmailPresent)
        console.log("present or not", isEmailPresentGoogle)

        if (isEmailPresent || isEmailPresentGoogle) {
            // only login
            try {
                const response = await apiConnector("POST", auth.LOGIN_API, {
                    email: userLoginData.email,
                    password: userLoginData.password
                })

                if (!response.data.success) {
                    throw new Error(response.data.message);
                } else {
                    setUserLoginData({
                        email: "",
                        password: "",
                    });

                    navigate("/");
                    console.log("email exists response:", response)
                }

            } catch (error) {
                console.log("error in login form: ", error);
            }
        }
        else {

            // save user login data
            saveLoginData(userLoginData);

            // send otp and navigate verify otp
            const response = await apiConnector("POST", auth.SEND_OTP_API, {
                email: userLoginData.email,
                password: userLoginData.password,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                navigate("/verify-otp");
                console.log("otp response : ", response);
            }
        }
    };


    return (
        <div className={Style.emailPassLogin}>
            <form onSubmit={(e) => handleUserLoginFormData(e)}>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter Email Address"
                    value={userLoginData.email}
                    onChange={(e) => handleInput(e)}
                />
                <input
                    type="password"
                    name="password"
                    id=""
                    placeholder='password'
                    value={userLoginData.password}
                    onChange={(e) => handleInput(e)}
                    required
                />
                <input type="submit" value="Sign In" />
            </form>
        </div>
    )
}

export default EmailPassLogin