import React ,{useState} from 'react';


export default function Test(){

  const [imgMsg,setImg] = useState(undefined);

  const onChange = (e) => {
    setImg(e.target.files[0]);
  }
  const onSubmit = (e) => {

    e.preventDefault();

    let value = new FormData();
    const messageValue = {message : e.target['message'].value};
    if(messageValue.length > 0){
      console.log("LOL")
    }
    if(imgMsg !== undefined){
      value.append('image', e.target['image'].files[0]);
      value.append('message', JSON.stringify(messageValue));
    }else value = JSON.stringify(messageValue);
    console.log(e.target['image'].files[0])
    const header = {
      method: "POST",
      headers: {
        
      },
      body: value,
    };
    fetch(process.env.REACT_APP_API_URL+"test", header)
    .then(res => {return res.json()})
    .then(res => {
      if(res.error) console.error(res.error)
      else console.log(res)
    })
    .catch(err => console.error(err))
  }



  return (
    <form action="#" onSubmit={onSubmit} >
      
    <div>
          <input
            className="imageInput"
            type="file"
            name="image"
            id='testSetterImg'
            accept="image/jpg, image/jpeg, image/png"
            onChange={onChange}
          />
          {imgMsg !== undefined && (
            <img
              className="imageRevisual"
              src={URL.createObjectURL(imgMsg)}
              alt="Image_a_envoyer"
            />
          )}
      </div>
      <input type="text" name='message'/>
      <input type="submit" />
    </form>
  );
}