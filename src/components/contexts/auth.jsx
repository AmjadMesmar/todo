/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React , { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import cookie from 'react-cookies';



const API = 'https://auth-server-401.herokuapp.com';
const SECRET = 'supersecret';//you should never add your secret to your front end app, even in the env variables. instead you need to re-verify in the server

export const SigninContext = React.createContext(); 



const SigninProvider =(props)=> {
    
     const  [user ,setUser ] = useState({})
     const  [token ,seToken ] = useState(null)
     const  [loggedIn ,setLoggedIn ] = useState(false)


      
    


    useEffect(()=>{
        const token = cookie.load('auth') //read cookie from browser
        validateToken(token)
    },[])

  const  login = async (username, password) => {
        try {
            const response = await superagent.post(`${API}/signin`)
                .set('authorization', `Basic ${btoa(`${username}:${password}`)}`);

            validateToken(response.body.token);
        } catch (error) {
            console.error('Failed to signin', error.message);
        }
    }
 
    const signup =async (username,password,email,role) =>{
         try {
            const response = await superagent.post(`${API}/signup` , {username, email ,password, role})
            validateToken(response.body.token);
            console.log(username,password,email,role)

         } catch (error) {
             console.error('falid to signup' ,error.message);
         }
    }

   const validateToken = (token) => {
        try {
            const user = jwt.decode(token);
            console.table(user);
            setLoginState(!!user, token, user);// about the double !, we use this to send true if the user has values otherwise send false. (this will pass a boolean instead of an object)
        } catch (error) {
            console.error('User is not verified', error.message);
            setLoginState(false, null, {})
        }
    }


  const   logout = () => {
        setLoginState(false, null, {})
    }

 const  setLoginState = (loggedIn, token, user) => {
        cookie.save('auth', token);
        seToken(token)
        setLoggedIn(loggedIn)
        setUser(user)
    }

    let state = {
        loggedIn: loggedIn,
        token: token,
        login: login,
        logout: logout,
        user: user,
        signup: signup
    }

  
        return (
            <SigninContext.Provider value={state}>
                {props.children}
            </SigninContext.Provider>
        );
    
}

export default SigninProvider;