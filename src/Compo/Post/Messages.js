import React, {useState, useEffect} from 'react';

import Post from './Post';


export default function Messages(){

    const [data,setData] = useState([]);
    const [offtrue, setOff] = useState(true)

    useEffect(() =>{
        if(offtrue){
            fetch(process.env.REACT_APP_API_URL+"post/")
            .then(function(res){
                return res.json();
            }).then(function(data){
                setData(data);
                setOff(false);
            }
            ).catch(
                err => {console.log(err)}
                );
        }
                
    })
    return(
        <div>
            {data.map(value =>(
                <Post valuName={value.name} valuDesc={value.description} />
            ))}
        </div>
    )
    

}