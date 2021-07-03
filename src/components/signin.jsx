/* eslint-disable no-unused-vars */
import React, { useState,useContext}from 'react';
import {SigninContext} from './contexts/auth';
import { If, Else, Then } from 'react-if';

const Signin = (props) => {
    
    const context = useContext(SigninContext)


        const [username,setUsername] =useState('')
        const [password,setPassword] =useState('')
    

  const  handleSubmit = (e) => {
        e.preventDefault();
       
        context.login(e.target.username.value,e.target.password.value  );
    }

    const handleSignup = (e) => {
        e.preventDefault(); 
      
        context.signup(e.target.username.value,e.target.password.value,e.target.email.value ,e.target.select.value )
    }

    const  handleChange = (e) => {
        if(e.target.name===username){
            setUsername(e.target.value)
        }else{
            setPassword(e.target.value)
        }
    }
  
        return (
       
        
        <If condition={context.loggedIn}>
        <Then>
            <button onClick={context.logout}>Log out</button>
        </Then>
        <Else>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" onChange={handleChange} />
                <input type="text" name="password" placeholder="password" onChange={handleChange} />
                <button>Login</button>
            </form>

            <form onSubmit={handleSignup}>
                <label>signup </label>
       <input type="text" name="username" placeholder="username" />
       <input type="text" name="password" placeholder="password" />
       <input type="text" name="email" placeholder="email" />
       <select name="select">
           <option name="user" id="user" value="user">User </option>
           <option name="admin" id="admin"value="admin" >Admin </option>
           <option name="editor" id="editor" value="editor"> Editor </option>
           <option name="writer" id="writer" value="writer"> Writer </option>
        
           
       </select>
       <button>signup</button>

                </form>

        </Else>
    </If>
     
        );
    
}

export default Signin;