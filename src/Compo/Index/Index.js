import Image from '../../IMG/IMG_Batiment.png'

import '../../Style/Index/index.css'
 
export default function Index(){
    return(
        <div className='mainIndex'>
            <h1>Groupomania React Tchat</h1>
            <img src={Image} alt='Immage du batiment de Groupomania'/>
            <p>Groupomania React Tchat est le réseau social privé de l'entreprise Groupomania!<br/>
            Il permet à ses employés de discuter de partager entre collèges en toute simplicité</p>
        </div>
    )
 }