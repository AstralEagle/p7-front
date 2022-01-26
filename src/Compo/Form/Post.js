import Desc from './Description';
import TextInput from './TextInput';
import '../../Style/Form.css'

export default function Post(){
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(process.env.REACT_APP_API_URL);
        const value = {
            userID : localStorage.getItem('userID'),
            name : e.target['name'].value,
            description: e.target['desc'].value
        }
        fetch(process.env.REACT_APP_API_URL+"post/",{
            method: "POST",
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify(value)
        }).then(function(res) {
            if (res.ok) {
                return res.json();
            }
        }).then(function(value){
            console.log(value);
        }).catch(function(err){
            console.error(err.message);
        });        
    }

    return(
        <form action="#" onSubmit={handleSubmit}>
            <TextInput valueInput="name" nameInput="Nom du post"/>
            <Desc />
            <input type="submit"/>
        </form>
    );
}