import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { auth } from '../service/api';
import { apiConnector } from '../service/api-connector';
import Style from "../components/core/login-page/login-page.module.css";
import { imageAssets } from '../assets/js/image-assets';

const GoogleLogin = () => {

    const responseGoogle = async (authResult) => {
        try {
            if (authResult['code']) {
                // console.log("Google code: ", authResult['code']);

                const result = await apiConnector("GET", `${auth.SIGNUP_API}?code=${authResult['code']}`);

                console.log("Google login response: ", result);
            }
        } catch (error) {
            console.error("Error while requesting google code", error);

        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })



    return (
        <div className={Style.googleLogin}>
            <button onClick={googleLogin}>
                <img src={imageAssets.GoogleIcon} alt="GoogleIcon" />
                <span>Login with Google</span>
            </button>
        </div>
    );
};

export default GoogleLogin;