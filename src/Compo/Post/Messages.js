import React, {useState, useEffect} from 'react';
import Post from './Post';
import '../../Style/PostMessage.css'


export default function Messages(){

    const [data,setData] = useState([]);

    useEffect(() =>{
        fetch(process.env.REACT_APP_API_URL+"post/")
            .then(function(res){
                return res.json();
            }).then(function(data){
                setData(data);
            })
            .catch(
                err => {console.log(err)}
                );                
    },[])
    return(
        <div className="listOfMessage">
            {data.map(value =>(
                <Post valuName={value.name} valuDesc={value.description} valuID={value.id} />
            ))}
        </div>
    )
    

}