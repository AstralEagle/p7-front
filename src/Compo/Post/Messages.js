import React, {useState, useEffect} from 'react';
import Post from './Post';
import '../../Style/PostMessage.css'


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
        <div className="listOfMessage">
            {data.map(value =>(
                <Post valuName={value.name} valuDesc={value.description} valuID={value.id} key={value.id+"POST"} />
            ))}
        </div>
    )
    

}