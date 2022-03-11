import React , {useState, useEffect} from "react"
import { Routes, Route } from "react-router-dom"
import Login from './Form/Log'
import Index from './Index/Index'
import PostPage from './Post/Page/Index'
import Banner from './Banner/Banner'
import Post from './Post/Messages'
import Message from './Message/HUB'
import SettingsChan from './SettingsChannel/Index'
import AddAcces from './SettingsChannel/AddAcces'
import Admin from './Admin/Index'
import Test from './Test/Test'
import User from './User/Index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faSignOutAlt, faHeart, faTimes} from '@fortawesome/free-solid-svg-icons'

import Request from '../Outil/request'
import Header from '../Outil/header'

import '../Style/Index.css'


export default function App() {
  library.add(far, faSignOutAlt, faHeart, faTimes);
  const [connected, setConnect] = useState(false);
  useEffect(() => {
    getConnect();
  }, []);
  const getConnect = () => {
    if (
      typeof localStorage.getItem("userID") !== "undefined" &&
      localStorage.getItem("userID") !== null
    ) {
      const callBack = (res) => {
        setConnect(true);
      };
      Request("connect", Header.loged("GET"), callBack);
    }
  };

  if (connected) {
    return (
      <div>
        <Banner />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/log" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/post" element={<Post />} />
          <Route path="/message" element={<Message />} />

          <Route path="/message" element={<Message />} />
          <Route path="/channel/:idChan" element={<SettingsChan />} />
          <Route path="/join/:id" element={<AddAcces />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    );
  }else{
    return (
      <div>
        <Login />
      </div>
    );
  }
}
