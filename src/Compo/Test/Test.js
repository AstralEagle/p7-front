

export default function Test(){
  const req = (e)=>{
    var obj = {
      object: {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Host': 'api.producthunt.com'
        }
      }}
    fetch(process.env.REACT_APP_API_URL+'test',obj)
    .then(res => res.json())
    .then((value)=>{

    }).catch(err => console.error(err));

    }

  return(
    <div>
      <p onClick={req}>Test</p>
    </div>
  );
}