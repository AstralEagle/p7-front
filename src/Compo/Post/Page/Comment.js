
import {IoWarningOutline} from 'react-icons/io5'

export default function Comment({comment}){

    const reportCommentaire = () => {
        
    }

    return(
        <div>
            <h3>{comment.userName+" "+comment.userlastName}</h3>
            <div>
                <p>{comment.comment}</p>
                <IoWarningOutline onclick={reportCommentaire}/>
            </div>
        </div>
    )
}