

export default function Test(){
  var obj = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')+" "+localStorage.getItem('userID'),
    }
  }
    fetch(process.env.REACT_APP_API_URL+'post/1',obj)
    .then(res => res.json())
    .then((value)=>{
      console.log(value);

    }).catch(err => {
      console.error(err)
    });

  return(
    <div>
      <p>Test</p>
    </div>
  );
}