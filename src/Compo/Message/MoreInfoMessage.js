export default function MoreInfo ({message}){
    return (
        <ul>
            {(message.id_user === localStorage.getItem("userID")) &&
            <li>    </li>
            }
        </ul>
    );
}