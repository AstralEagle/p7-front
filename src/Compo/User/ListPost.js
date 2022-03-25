import React, { useState, useEffect } from "react";

import Request from "../../Outil/request";
import Header from "../../Outil/header";

import Item from "./ItemPost";

export default function Posts({ idUser }) {
  const [listLike, setLikes] = useState([]);

  const getLikes = () => {
    const callBack = (res) => {
      setLikes(res);
    };
    Request(`auth/${idUser}/posts`, Header.loged("GET"), callBack);
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      {listLike.map((post) => (
        <Item post={post} key={post.id+'item'} />
      ))}
    </div>
  );
}
