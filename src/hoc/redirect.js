import React from 'react'
import Auth from "../service/auth0";
import {Redirect} from "react-router-dom";

const auth = new Auth();

const redirect=(WrappedComponent)=>{
    return (props) => {
        return (
            (WrappedComponent.name && (WrappedComponent.name==='CustomNavbar'|| WrappedComponent.name==='Callback'||
            WrappedComponent.name==='App'|| WrappedComponent.name==='Home'))
                ?
            <WrappedComponent auth={auth} {...props}/>
    :
        auth.isAuthenticated()?<WrappedComponent auth={auth} {...props}/>:<Redirect to="/"/>
        )
    }
};
export default redirect