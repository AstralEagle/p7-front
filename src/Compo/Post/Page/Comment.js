import {IoWarningOutline,IoCloseCircle} from 'react-icons/io5'

import Request from '../../../Outil/request'
import Header from '../../../Outil/header'

import '../../../Style/Post/Page/Comment/Comment.css'

export default function Comment({comment,refreshComment}){


    const deleteComment = (e) => {
        if(window.confirm('Supprimer le commentaire?')){
            Request(`post/comment/${comment.id}`,Header.loged('DELETE'),refreshComment)
        }
    }
    const reportCommentaire = (e) => {
         const callBack = (res) => {
            console.log(res)
         }   
         Request(`report/comment/${comment.id}`, Header.loged('POST',{userID : localStorage.getItem('userID')}),callBack)
    }


    return(
        <div className="commentPost">
            <h3 className="commentName">{comment.userName+" "+comment.userlastName}</h3>
            <div className="commentLine">
                <p className="commentText">{comment.comment}</p>

                {comment.userID == localStorage.getItem('userID') ? 
                (
                    <IoCloseCircle onClick={deleteComment} className='hiddenButton' />
                ):
                (
                    <IoWarningOutline onClick={reportCommentaire} className="hiddenButton"/>
                )
                }
            </div>
        </div>
    )
}