import React, {useState} from 'react';
import Logo from '../../IMG/icon-left-font.svg';
import '../../Style/Banner.css'


export default function Banner(){
    
    const [banner,setBanner] = useState(0);


    if(typeof localStorage.getItem('userID') !== 'undefined' && localStorage.getItem('userID') !== null){
        const header ={
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')+" "+localStorage.getItem('userID'),
            },
        }
        fetch(process.env.REACT_APP_API_URL+'connect',header)
            .then((res) => {return res.json()})
            .then((res) => {
                if(res.succes === "Connected"){
                    console.log(res.succes);
                    setBanner(1);
                }
            })
            .catch((err) => {console.error(err)});    
        }else{
        }
        if(banner === 0){
            console.log("disconnected")
            return disconnected();
        }else if(banner === 1){
            console.log("connected")
            return connected();
        }
}

function disconnected(){
    return(
        <div>
            <img src={Logo} alt='Logo'/>
            <div>
                <ul>
                    <li>Connexion</li>
                    <li>S'inscrire</li>
                </ul>
            </div>
        </div>
    );
}
function connected(){
    const logOut = (event) => {
        localStorage.removeItem('userID');
        localStorage.removeItem('token');
        window.location = "/log";

    }

    return(
        <div>
            <img src={Logo} alt='Logo'/>
            <div>
                <ul>
                    <li onClick={logOut}>Déconnexion</li>
                </ul>
            </div>
        </div>
    );
}