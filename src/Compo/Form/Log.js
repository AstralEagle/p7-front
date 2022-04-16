import Login from './Login';
import Signup from './Signup';

import'../../Style/Log.css';

export default function Log(){
    return (
        <div className="divLog">
            <Login />
            <Signup />
        </div>
    );
}