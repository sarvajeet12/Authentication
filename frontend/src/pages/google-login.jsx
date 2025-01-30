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

                const response = await apiConnector("GET", `${auth.GOOGLE_LOGIN_API}?code=${authResult['code']}`);

                if (!response.data.success) {
                    throw new Error(response.data.message);
                } else {

                    console.log("Google login response: ", response);
                }

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