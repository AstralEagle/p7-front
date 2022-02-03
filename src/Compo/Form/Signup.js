import TextInput from './TextInput';
import EmailInput from './EmailInput';
import PassInput from './PassInput';


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
        }).then(() => {
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
        }).catch(function(err){
            console.error(err.message);
        });        
    }

    return(
        <form action="#" onSubmit={handleSubmit} className='formLog'>
            <EmailInput />
            <div className="row">
                <TextInput  valueInput={"name"} nameInput={"Prénom"}/>
                <TextInput valueInput={"lastName"} nameInput={"Nom"}/>
            </div>
            <PassInput />
            <input type="submit" className="submitButt"/>
        </form>
    );
}

