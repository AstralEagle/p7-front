import React, {useState} from 'react'

import PassInput from './Compo/Mdpinput';
import EmailInput from './Compo/Emailinput';

import Request from '../../../Outil/request';
import Header from '../../../Outil/header';

import '../../../Style/Login/Section/Section.css';

export default function Login(){

    const [errorText, setError] = useState(undefined)

    const login = (value) => {

        const callBack = (res) => {
            localStorage.setItem("userID", res.userID);
            localStorage.setItem("token", res.token);
            window.location = "/";
        }
        const errorBack = (res) => {
            setError(res.error)
        }
        
        Request('auth/login',Header.disconnected(value),callBack,errorBack);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const value = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        login(value);            
    }

    return(
        <form action="#" onSubmit={handleSubmit} className="mainForm">
            <h3>Connexion</h3>
            <p className='errorInput'>{errorText}</p>
            <EmailInput />
            <PassInput />
            <input type="submit" className="submitForm"/>
        </form>
    );
}