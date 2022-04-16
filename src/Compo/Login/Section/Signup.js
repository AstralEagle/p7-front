import TextInput from './Compo/Textinput';
import EmailInput from './Compo/Emailinput';
import PassInput from './Compo/Mdpinput';

import Request from '../../../Outil/request'
import Header from '../../../Outil/header'

import '../../../Style/Login/Section/Section.css'

export default function Signup(){


    const login = (value) => {
    
    const callBack = (res) => {
        localStorage.setItem("userID", res.userID);
        localStorage.setItem("token", res.token);
        window.location = "/";
    }
    Request('auth/login',Header.disconnected(value),callBack);
    }

    const signUp = (value) => {

        const callBack = () => {
            login(value);
        }
        const errorBack = () => {
        }
    
        Request('auth/signup',Header.disconnected(value),callBack,errorBack);
        
    }

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = {
      name: e.target["name"].value,
      last_name: e.target["lastName"].value,
      email: e.target["email"].value,
      password: e.target["password"].value,
    };

    signUp(value);
  };

  return (
    <form action="#" onSubmit={handleSubmit} className="mainForm">
      <EmailInput />
      <div className="rowForm">
        <TextInput valueInput={"name"} nameInput={"Prénom"} />
        <TextInput valueInput={"lastName"} nameInput={"Nom"} />
      </div>
      <PassInput />
      <input type="submit" className="submitForm" />
    </form>
  );
}

