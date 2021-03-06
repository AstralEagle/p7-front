import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Login/Index";
import Index from "./Index/Index";
import PostPage from "./Post/Page/Index";
import Banner from "./Banner/Banner";
import Post from "./Post/Messages";
import Send from "./Post/Post/Post"
import Message from "./Message/HUB";
import SettingsChan from "./SettingsChannel/Index";
import AddAcces from "./SettingsChannel/AddAcces";
import Admin from "./Admin/Index";
import Test from "./Test/Test";
import User from "./User/Index";

import Request from "../Outil/request";
import Header from "../Outil/header";

import "../Style/Index.css";

export default function App() {
  const [myUser, setConnect] = useState(false);
  const getConnect = () => {
    if (
      typeof localStorage.getItem("userID") !== "undefined" &&
      localStorage.getItem("userID") !== null
    ) {
      const callBack = (res) => {
        setConnect(res);
      };
      Request("auth/", Header.loged("GET"), callBack);
    }
  };
  useEffect(() => {
    getConnect();
  }, []);

  if (myUser) {
    return (
      <div>
        <Banner myUser={myUser} />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/log" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/post" element={<Post />} />
          <Route path="/send" element={<Send />} />
          <Route path="/message" element={<Message />} />

          <Route
            path="/channel/:idChan"
            element={<SettingsChan myUser={myUser} />}
          />
          <Route path="/join/:id" element={<AddAcces />} />
          <Route path="/user/:id" element={<User myUser={myUser} />} />
          <Route path="/post/:id" element={<PostPage myUser={myUser} />} />

          {myUser.op && <Route path="/admin" element={<Admin />} />}

          <Route default path="*" element={<Index />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <Login />
      </div>
    );
  }
}
