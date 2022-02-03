import PassInput from './PassInput';
import EmailInput from './EmailInput';
import'../../Style/Form.css';


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
            localStorage.setItem('userID', value.userID);
            localStorage.setItem('token', value.token)
            window.location = "/";
        }).catch(function(err){
            console.error(err.message);
        });        
    }

    return(
        <form action="#" onSubmit={handleSubmit} className="formLog">
            <EmailInput />
            <PassInput />
            <input type="submit" className="submitButt"/>
        </form>
    );
}