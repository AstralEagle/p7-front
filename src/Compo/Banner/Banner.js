import React from 'react';
import Logo from '../../IMG/icon-left-font-monochrome-black.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../Style/Banner.css';



export default function Banner(){
    const logOut = (event) => {
        localStorage.removeItem('userID');
        localStorage.removeItem('token');
        window.location = "/";
    }
    const onBeta = (e) => {
        window.location = "/beta";
    }

    return (
      <div className="banner">
        <img src={Logo} alt="Logo" onClick={onBeta}/>
        <div>
          <ul>
            <li>
              <FontAwesomeIcon icon='sign-out-alt' onClick={logOut} size="2x" />
            </li>
          </ul>
        </div>
      </div>
    );
}
