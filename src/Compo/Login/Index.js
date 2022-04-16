import React,{useRef,useEffect} from 'react';

import Login from './Section/Login';
import Signup from'./Section/Signup';

import'../../Style/Login/Index.css';

export default function Log(){

    const resizeRef = useRef();
    
    const mainResize = () => {
        if(parseInt(window.innerWidth) > 1024)
        resizeRef.current.style.height = parseInt(window.innerHeight) + 'px';
        else
        resizeRef.current.style.height = parseInt(window.innerHeight)*2 + 'px';
    }

    useEffect(() => {
        mainResize();
        window.addEventListener('resize',mainResize);
    },[])

    return (
        <div className="divLog" ref={resizeRef}>
            <Login  />
            <Signup />
            
        </div>
    );
}