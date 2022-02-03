import React , {useState} from "react"
import { Routes, Route } from "react-router-dom"
import Login from './Form/Log'
import Post from './Form/Post'
import Messages from './Post/Messages'
import Banner from './Banner/Banner'
import Beta from './Message/HUB'
import Test from './Test/Test'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faSignOutAlt, faHeart, faTimes} from '@fortawesome/free-solid-svg-icons'



export default function App() {
  library.add( far, faSignOutAlt, faHeart, faTimes);
  const [connected, setConnect] = useState(false);

  if (
    typeof localStorage.getItem("userID") !== "undefined" &&
    localStorage.getItem("userID") !== null
  ) {
    const header = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          localStorage.getItem("token") +
          " " +
          localStorage.getItem("userID"),
      },
    };
    fetch(process.env.REACT_APP_API_URL + "connect", header)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.succes === "Connected") {
          setConnect(true);
        }
      })
      .catch((err) => console.error(err));
    if (connected) {
      return (
        <div>
          <Banner />
          <Routes>
            <Route exact path="/" element={<Messages />} />
            <Route path="/log" element={<Login />} />
            <Route path="/test" element={<Test />} />
            <Route path="/post" element={<Post />} />
            <Route path="/beta" element={<Beta />} />
          </Routes>
        </div>
      );
    }
  }
  return (
    <div>
      <Login />
    </div>
  )
}
