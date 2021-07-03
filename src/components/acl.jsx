import React , {useContext}from 'react';
import {SigninContext} from './contexts/auth';
import { If } from 'react-if';

const Acl =(props)=>  {
    const context = useContext(SigninContext)

  
        let okToRender = false;
        try {
            /*
                logged in user capabilities: read, delete
                edit button will have edit capability => this will be hidden
                delte button will have delete capability => this will be visibile
            
            */

            okToRender = context.loggedIn //this means the use must be logged in
                && props.capability// this means the user must have at least one capability
                ? context.user.capabilities.includes(props.capability)//check if the logged in user capabilities has the curren button allowed capability
                : false;
        } catch (error) {
            console.log('Not Authorized', error.message);
        }
        return (
            <If condition={okToRender}>
                {props.children}
            </If>
        );
   
}

export default Acl;