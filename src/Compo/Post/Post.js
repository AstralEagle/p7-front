import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Post(props){

    const name = props.valuName;
    const description = props.valuDesc.split('\n');

    const [like,setLike] = useState(0);
    const [isLiked,setIsLike] = useState(false);


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
                if(res.isLike){
                    setIsLike(true);
                }
                else{
                    setIsLike(false);
                }
                setLike(res.nbrLike)
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
    return (
      <div className="message">
        <h3>{name}</h3>
        <div className="descPara">
          {description.map((descri) => (
            <p className="textPara" key={descri+props.valuID}>{descri}</p>
          ))}
        </div>
        <div className="shareOption">
          {isLiked ? (
            <FontAwesomeIcon icon="heart" size="lg" className="inputLiked" onClick={onClick}/>
          ) : (
            <FontAwesomeIcon icon={["far", "heart"]} size="lg" className="inputLike" onClick={onClick} />
          )}
          <p>{like}</p>
        </div>
      </div>
    );
}
