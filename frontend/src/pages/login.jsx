import React from 'react'
import Style from "../components/core/login-page/login-page.module.css";
import EmailPassLogin from './email-pass-login';
import GoogleLogin from './google-login';
import { GoogleOAuthProvider } from '@react-oauth/google';


const GoogleAuthWrapper = () => {
    return (
        <GoogleOAuthProvider clientId="93284932558-ldbgafetuieg5ntpt8g5bp64id5m3665.apps.googleusercontent.com">
            <GoogleLogin />
        </GoogleOAuthProvider>
    )
}


const Login = () => {

    return (
        <div className={Style.loginPage}>
            <EmailPassLogin />
            <hr className={Style.hrLine} />
            <GoogleAuthWrapper />
        </div>
    )
}

export default Login