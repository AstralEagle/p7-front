

export default function Test(){
  
  var obj = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')+" "+localStorage.getItem('userID'),
    },
  }
  const onClick = (event) => {
        fetch(process.env.REACT_APP_API_URL+'message/3/channel',obj)
        .then(res => res.json())
        .then((value)=>{
          console.log(value);
          onChange(value);
    
        }).catch(err => {
          console.error(err)
        });
    }
    const onChange = (value) => {
      const tableau = [[value[0].id_user,[]]];
      let compteur = 0;
      for(let val of value) {
        if(tableau[compteur][0] === val.id_user){
          tableau[compteur][1].push(val);
        }
        else{
          tableau.push([val.id_user,[val]]);
          compteur++;
        }
      }
      console.log(tableau);
    }

  return(
    <div>
      <p onClick={onClick}>Test</p>
    </div>
  );
}