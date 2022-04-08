//Function request besoin d'attribut
// (URL,Header,CallBack,ErrorBack)
export default function RequestWithErro(url,header,callBack,errorBack){
    fetch(process.env.REACT_APP_API_URL+url,header)
    .then(res => res.json())
    .then(res => {
        if(res.error){
            if(res.error === "Log out"){
                console.error('Log Out!');
                localStorage.removeItem('userID');
                localStorage.removeItem('token');
                window.location = '/';
            }
            else if(!errorBack)
                console.error(res);
            else
                errorBack(res);
        }
        else
            callBack(res)
    })
    .catch(err => console.error(err))
}