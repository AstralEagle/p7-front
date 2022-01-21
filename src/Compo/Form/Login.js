import Email from './Email.js';
import Password from './PassWord.js';
import '../../Style/Form.css'

export default function Login(){
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(process.env.REACT_APP_API_URL);
        const value = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        fetch(process.env.REACT_APP_API_URL+"auth/login",{
            method: "POST",
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(value)
        }).then(function(res) {
            if (res.ok) {
                return res.json();
            }
        }).then(function(value){
            console.log(value);
            localStorage.setItem('userID', value.userID);
            localStorage.setItem('token', value.token)
            window.location = "/";
        }).catch(function(err){
            console.error(err.message);
        });        
    }

    return(
        <form action="#" onSubmit={handleSubmit}>
            <Email />
            <Password />
            <input type="submit"/>
        </form>
    );
}