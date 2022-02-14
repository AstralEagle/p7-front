
export default function CreateChannel({getAllChan,setChannel}){

    const onSubmit = (e) =>{
        e.preventDefault();
        const header = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')+" "+localStorage.getItem('userID'),
            },
            body: JSON.stringify({
                nameChan : e.target['name'].value,
                userID : localStorage.getItem('userID')
            })
        }
        fetch(process.env.REACT_APP_API_URL+'channel',header)
        .then(res => {return res.json()})
        .then(res => {
            if(res.error){
                console.error(res.error);
              }
              else{      
            getAllChan();
              }
        })
        .catch(err => {console.error(err)})
    }

    return(
        <div>
            <p>Create a new channel</p>
            <form action='#' onSubmit={onSubmit} className='formCreateChannel'>
                <label htmlFor='name' className='labelName'>Nom du channel</label>
                <input type='text' name='name' className='inputName'/>
                <input type='submit' />
            </form>
        </div>
    )
}