import Request from '../../../Outil/request';
import Header from '../../../Outil/header';

export default function Post() {
    
    const onSubmit = (e) => {
        
        e.preventDefault();

        const value = {
            userID : localStorage.getItem('userID'),
            postName : e.target['name'].value,
            description : e.target['description'].value,
        }
        console.log(e.target['description'].value   )
        const header = Header.loged('POST',value);
        const afterRequest = (res) => {
            window.location = "/";
        };

        Request('post/',header,afterRequest);
    }
    
    return (
        <form onSubmit={onSubmit}>
            <label name='name' >Nom</label>
            <input name='name' type='text' />
            <label name='description' >Message</label>
            <textarea type="text" name="description"></textarea>
            <input value="Envoyer" type='submit'/>
        </form>
    )
}