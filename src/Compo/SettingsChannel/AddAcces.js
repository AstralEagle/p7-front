import {useParams} from 'react-router-dom';

export default function Acces(){
  let link = useParams().id;
  const header = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        localStorage.getItem("token") +
        " " +
        localStorage.getItem("userID"),
    },
    body: JSON.stringify({ userID: localStorage.getItem("userID") })
  };
  fetch(process.env.REACT_APP_API_URL+"acces/"+link, header)
  .then((res) => {return res.json})
  .then((res) => {
    if(res.error){
      console.error(res.error);
    }
    window.location = "/beta";
  })
  .catch((err) => {console.error(err)})
  return (
      <div>
      </div>
  )
}