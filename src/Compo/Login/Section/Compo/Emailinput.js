import '../../../../Style/Login/Input/Input.css'

export default function Email(){
    return(<div className="champs">
        <label htmlFor="email">Email</label>
        <input type="email" name="email"></input>
        </div>);
}