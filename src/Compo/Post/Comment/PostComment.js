import Request from '../../../Outil/request'
import Header from '../../../Outil/header'

import '../../../Style/Post/Message/Comment/AddComment.css'

export default function Post({message,onDisable}){

    const onSubmit = (e) => {

        e.preventDefault();

        const value = {
            userID : localStorage.getItem('userID'),
            comment : e.target['comment'].value
        }
        
        const callBack = (res) => {
            onDisable();
        }

        Request(`post/${message.id}/comment`,Header.loged('POST',value),callBack);

    }

    return(
        <form onSubmit={onSubmit} className='formAddComment'>
            <input type='text' name='comment' className='textAddComment'/>
            <input value="Envoyer" type='submit' className='inputAddComment'/>
        </form>
    )
}