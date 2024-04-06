
// import React from 'react'
// import {Navigate} from "react-router-dom"
// const Protected = ({children}) => {
//     const token = localStorage.getItem("diaryToken");
//     if(!token) {
//         return <Navigate to="/" />;
//     }

//     return(
//         <>{children}</>
//     )
// };
// export default Protected;



import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
    const [isTokenValid, setIsTokenValid] = useState(true);

    useEffect(() => {
        const getEmail = localStorage.getItem("diaryUser");
        const verifyToken = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/auth/gettokeninfo/${localStorage.getItem('diaryToken')}`);
                
                if (response.ok) {
                    const data = await response.json(); 
                    if (data.status === "verified" && data.email === getEmail) {
                        setIsTokenValid(true);
                    } else {
                        setIsTokenValid(false);
                    }
                } else {
                    setIsTokenValid(false);
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsTokenValid(false);
            }
        };

        verifyToken();
    }, []);

    if (!isTokenValid) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default Protected;
