import '../../../../Style/Login/Input/Input.css'

export default function PassWord(){
    return(<div className="champs">
        <label htmlFor="password">Mot de Passe</label>
        <input type="password" name="password"></input>
    </div>)
}