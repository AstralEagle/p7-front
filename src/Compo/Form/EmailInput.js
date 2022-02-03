import '../../Style/textInput.css';

function Email(){
    return(<div className="champs">
        <label htmlFor="email">Email</label>
        <input type="email" name="email"></input>
        </div>);
}

export default Email;