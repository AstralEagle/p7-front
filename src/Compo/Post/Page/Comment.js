import {IoWarningOutline} from 'react-icons/io5'

import Request from '../../../Outil/request'
import Header from '../../../Outil/header'

import '../../../Style/Post/Page/Comment/Comment.css'

export default function Comment({comment}){

    const reportCommentaire = (e) => {
         const callBack = (res) => {
            console.log(res)
         }   
         Request(`report/comment/${comment.id}`, Header.loged('POST',{userID : localStorage.getItem('userID')}),callBack)
    }


    return(
        <div className="commentPost">
            <h3 className="commentPost">{comment.userName+" "+comment.userlastName}</h3>
            <div className="commentLine">
                <p className="commentText">{comment.comment}</p>
                <IoWarningOutline onClick={reportCommentaire} className="commentReport"/>
            </div>
        </div>
    )
}