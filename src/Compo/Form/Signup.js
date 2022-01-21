import Name from './Name.js';
import LastName from './LastName.js';
import Email from './Email.js';
import Password from './PassWord.js';
import '../../Style/Form.css'


export default function Signup(){
    
    const handleSubmit = (e)=>{
                e.preventDefault();

        const value = {
            name: e.target['name'].value,
            last_name: e.target['lastName'].value,
            email: e.target['email'].value,
            password: e.target['password'].value,
        }
        fetch(process.env.REACT_APP_API_URL+"auth/signup",{
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
        }).then(function(val){
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
        }).catch(function(err){
            console.error(err.message);
        });        
    }

    return(
        <form action="#" onSubmit={handleSubmit}>
            <Email />
            <div className="row">
                <Name />
                <LastName />
            </div>
            <Password />
            <input type="submit" className="sendForm"/>
        </form>
    );
}

