import React, {useState, useEffect} from 'react';

export default function Post(props){

    const name = props.valuName;
    const description = props.valuDesc.split('\n');

    const [like,setLike] = useState(0);

    const getLike = () =>{
        const header ={
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')+" "+localStorage.getItem('userID'),
            },
        }
        fetch(process.env.REACT_APP_API_URL+'post/'+props.valuID,header)
            .then((res) => {return res.json()})
            .then((res) => {
                setLike(res)
            })
            .catch((err) => {console.error(err)});
    }
    
    useEffect(() =>{
        getLike();
    },[])


    const onClick = (event) => {
        var value = {
            userID: localStorage.getItem('userID')
        }
        var obj = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')+" "+localStorage.getItem('userID'),
            },
            body:JSON.stringify(value)
          }
            fetch(process.env.REACT_APP_API_URL+'post/'+props.valuID+'/like',obj)
            .then(res => res.json())
            .then((value)=>{
              getLike();
            }).catch(err => {
              console.error(err)
            });
    }
    return(
        <div>
            <h3 onClick={onClick}>{name}</h3>
            <div>
                { description.map(descri =>(
                    <p>{descri}</p>
                    ))}
            </div>
            <p>{like}</p>
        </div>
    )
}
