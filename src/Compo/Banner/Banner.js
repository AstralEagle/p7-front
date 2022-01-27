import React, {useState} from 'react';
import Logo from '../../IMG/icon-left-font-monochrome-black.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faSignInAlt,faUserPlus } from '@fortawesome/free-solid-svg-icons'
import '../../Style/Banner.css';



export default function Banner(){
    const logOut = (event) => {
        localStorage.removeItem('userID');
        localStorage.removeItem('token');
        window.location = "/";

    }

    return (
      <div className="banner">
        <img src={Logo} alt="Logo" />
        <div>
          <ul>
            <li>
              <FontAwesomeIcon icon={faSignOutAlt} onClick={logOut} size="2x" />
            </li>
          </ul>
        </div>
      </div>
    );
}
