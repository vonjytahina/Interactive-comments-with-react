import React, { useState } from "react";
import avatar from '../assets/images/avatars/image-juliusomo.png'

const AddComment = ({ handleSubmit, parentId}) => {
  const [text, setText] = useState("");
  const isTextareaDisabled = text.length === 0;
  
  const onClick = (event) => {
    event.preventDefault();
    handleSubmit(text, parentId);
    setText('')
  };
  return (
    <div className="add-comment" id="comment-1">
    <div className="avatar">
      <img src={avatar} alt="avatar" />
    </div>
    <div className="input-text-area">
      <textarea placeholder="Add a comment..."  value={text}  onChange={(e) => setText(e.target.value)}></textarea>
    </div>
    <div className="button-send">
      <button className="send" disabled={isTextareaDisabled} onClick={onClick}>Send</button>
    </div>
  </div>
  );
};

export default AddComment 