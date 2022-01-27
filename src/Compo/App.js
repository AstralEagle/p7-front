import React , {useState} from "react"
import { Routes, Route } from "react-router-dom"
import Login from './Form/Log'
import Post from './Form/Post'
import Messages from './Post/Messages'
import Banner from './Banner/Banner'
import Test from './Test/Test'

export default function App() {
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
            <Route path="/log" element={<Login />} />
            <Route path="/test" element={<Test />} />
            <Route path="/post" element={<Post />} />
            <Route exact path="/" element={<Messages />} />
          </Routes>
        </div>
      );
    }
  }
  return (
    <div>
      <Login/>
    </div>
  )
}
