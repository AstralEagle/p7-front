import '../../Style/textInput.css';

function PassWord(){
    return(<div className="champs">
        <label htmlFor="password">Mot de Passe</label>
        <input type="password" name="password"></input>
    </div>)
}

export default PassWord;