import React from "react";

export default function Item({ post }) {
  return (
    <div>
      <p>{post.name}</p>
      <p>{post.description}</p>
      <div>
          <p>{post.nbrComment}</p>
          <p>{post.nbrLike}</p>
      </div>
    </div>
  );
}
