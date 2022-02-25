import React, {useState, useEffect} from 'react';
import Post from './Post';
import '../../Style/Post/Message/Message.css'


export default function Messages(){

    const [data,setData] = useState([]);

    useEffect(() =>{
        fetch(process.env.REACT_APP_API_URL+"post/")
            .then(res => {
                return res.json();
            }).then(res => {
                if(res.error){
                    console.error(res.error);
                  }
                  else{          
                setData(res);
                  }
            })
            .catch(
                err => {console.log(err)}
                );                
    },[])
    return(
        <div className="AllMsg">
            {data.map(value =>(
                <Post message={value} key={value.id+"POST"} />
            ))}
        </div>
    )
    

}