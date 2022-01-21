import Logo from '../../IMG/icon-left-font.svg';
import '../../Style/Banner.css'


export default function Banner(){

    if(typeof localStorage.getItem('userID') !== 'undefined' && localStorage.getItem('userID') !== null){
        return(
            <img src={Logo} alt='Logo'/>
        )
    }else{
        return(
            <p>Test</p>
        )
    }
}