import { createContext, useState } from "react";


// 1. create
export const AppContext = createContext();

// 2. Provider
const ContextProvider = (props) => {

    const [loginData, setLoginData] = useState("");
    console.log("login data : ", loginData)

    const saveLoginData = (data) => {
        setLoginData(data);
    };


    // bundle
    const contextValue = {
        loginData,
        saveLoginData
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default ContextProvider;
