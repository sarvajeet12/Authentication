// const BASE_URL = import.meta.env.VITE_BASE_URL
const BASE_URL = "http://localhost:4000/api/v1";


export const auth = {
    // login with google api
    GOOGLE_LOGIN_API: BASE_URL + "/user/google-login",
    GOOGLE_ALL_USERS_API: BASE_URL + "/user/all-users-google",

    // login and registration api
    LOGIN_API: BASE_URL + "/user/login",
    SIGN_UP_API: BASE_URL + "/user/register",
    SEND_OTP_API: BASE_URL + "/user/send-otp",
    GET_ALL_USER_API: BASE_URL + "/user/all-user",
}
