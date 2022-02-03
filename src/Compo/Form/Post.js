import React,{useState} from 'react';
import Desc from './DescInput';
import TextInput from './TextInput';

export default function Post(){

    const handleSubmit = (e)=>{
        e.preventDefault();
        const value = {
            userID : localStorage.getItem('userID'),
            name : e.target['name'].value,
            description: e.target['desc'].value
        }
        fetch(process.env.REACT_APP_API_URL+"post/",{
            method: "POST",
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify(value)
        }).then(function(res) {
            if (res.ok) {
                return res.json();
            }
        }).catch(function(err){
            console.error(err.message);
        });        
    }

    return(
        <form action="#" onSubmit={handleSubmit} className='postform'>
            <TextInput valueInput="name" nameInput="Nom du post"/>
            <Desc />
            <input type="submit" className="submitButt"/>
        </form>
    );
}