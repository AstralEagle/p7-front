export default function Input(props){

    return(<div className="champs">
        <label htmlFor={props.valueInput}>{props.nameInput}</label>
        <input type="text" name={props.valueInput}></input>
        </div>);
}
