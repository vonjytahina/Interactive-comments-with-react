import React, { useEffect, useState } from "react";
import { getComments as getCommentsApi } from "../api";
import avatar from "../assets/images/avatars/image-juliusomo.png";

// comment component
const Comment = ({
  comment,
  replies,
  handleVote,
  handleDelete,
  handleAddReply,
  handleUpdateComment
}) => {
  // comments states
  const [backendComments, setBackendComments] = useState([]);
  const [plusClicked, setPlusClicked] = useState(false);
  const [minusClicked, setMinusClicked] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const isReplyTextDisabled = replyText.length === 0;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.body);

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

   // get parent comment id
  const getParent = (parentId) => {
    return backendComments.filter(
      (backendComment) => backendComment.id === parentId
    );
  };

  const handleReplySubmit = () => {
    handleAddReply(comment.id, replyText);
    setReplyText("");
    setShowReplyForm(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

 
  const handleUpdate = () => {
    handleUpdateComment(comment.id, editedContent); // Call the update function from prop
    setIsEditMode(false); // Exit edit mode
  };
  // fetch comments
  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <>
      {/* current user  */}
      {comment.username === "juliusomo" ? (
        <div class="comment edit-reply">
          <div class="left">
            {/* score event  */}
            <div
              className={`plus ${plusClicked ? "score-disabled" : ""}`}
              onClick={() => {
                if (!plusClicked) {
                  handleVote(comment.id, "up");
                  setPlusClicked(true);
                }
              }}
            >
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                  fill="#C5C6EF"
                />
              </svg>
            </div>
            <div class="score">{comment.score}</div>
            <div
              className={`minus ${minusClicked ? "score-disabled" : ""}`}
              onClick={() => {
                if (!minusClicked && comment.score > 0) {
                  handleVote(comment.id, "down");
                  setMinusClicked(true);
                }
              }}
            >
              <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                  fill="#C5C6EF"
                />
              </svg>
            </div>
          </div>
          <div class="right">
            <div class="right-top">
              <div class="right-top-left">
                <div class="image">
                  <img
                    src={require(`../assets/images/avatars/${comment.image}`)}
                    alt="avatar"
                  />
                </div>
                <div class="user-name">{comment.username}</div>
                <div class="you">you</div>
                <div class="created-at">{comment.relativeCreatedAt}</div>
              </div>
              <div class="right-top-right">
                <div class="delete-container">
                  <svg
                    width="12"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                      fill="#ED6368"
                    />
                  </svg>
                  <span class="delete" onClick={() => handleDelete(comment.id)}>
                    Delete
                  </span>
                </div>
                <div class="edit-container" onClick={toggleEditMode}>
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                      fill="#5357B6"
                    />
                  </svg>
                  <span class="edit">Edit</span>
                </div>
              </div>
            </div>
            <div class="right-bottom">
              {isEditMode ? (
                <>
                <p class="content">                  
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                </p>
                <div class="button-update">
                <button class="update" onClick={handleUpdate}>
                  Update
                </button>
              </div>
              </>
              ) : (
                <p class="content">
                  <span className="arobase">
                    {comment.parentId !== null &&
                    getParent(comment.parentId).length > 0
                      ? `@${getParent(comment.parentId)[0].username}`
                      : ""}
                  </span>{" "}
                  {comment.body}
                </p>                
              )}     
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="comment" id="comment-1">
            <div className="left">
              <div
                className={`plus ${plusClicked ? "score-disabled" : ""}`}
                onClick={() => {
                  if (!plusClicked) {
                    handleVote(comment.id, "up");
                    setPlusClicked(true);
                  }
                }}
              >
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </div>
              <div className="score">{comment.score}</div>
              <div
                className={`minus ${minusClicked ? "score-disabled" : ""}`}
                onClick={() => {
                  if (!minusClicked && comment.score > 0) {
                    handleVote(comment.id, "down");
                    setMinusClicked(true);
                  }
                }}
              >
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </div>
            </div>
            <div className="right">
              <div className="right-top">
                <div className="right-top-left">
                  <div className="image">
                    <img
                      src={require(`../assets/images/avatars/${comment.image}`)}
                      alt="avatar"
                    />
                  </div>
                  <div className="user-name">{comment.username}</div>
                  <div className="created-at">{comment.relativeCreatedAt}</div>
                </div>
                <div className="right-top-right">
                  <div className="reply-container">
                    <svg
                      width="14"
                      height="13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                        fill="#5357B6"
                      />
                    </svg>
                    <span className="reply" onClick={toggleReplyForm}>
                      Reply
                    </span>
                  </div>
                </div>
              </div>
              <div className="right-bottom">
                <p className="content">
                  <span className="arobase">
                    {comment.parentId !== null &&
                    getParent(comment.parentId).length > 0
                      ? `@${getParent(comment.parentId)[0].username}`
                      : ""}
                  </span>{" "}
                  {comment.body}
                </p>
              </div>
            </div>
          </div>
          {showReplyForm && (
            <div className="comment add-reply">
              <div className="avatar">
                <img src={avatar} alt="avatar" />
              </div>
              <div className="input-text-area">
                <textarea
                
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
              </div>
              <div className="button-reply" onClick={handleReplySubmit}>
                <button className="reply" disabled={isReplyTextDisabled}>Reply</button>
              </div>
            </div>
          )}
        </>
      )}
      {replies.length > 0 && (
        // comment replies and nested replies
        <div className="comment-reply-list">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={{
                ...reply,
                relativeCreatedAt: reply.relativeCreatedAt,
              }}
              replies={reply.nestedReplies}
              handleVote={handleVote}
              handleDelete={handleDelete}
              handleAddReply={handleAddReply}
              handleUpdateComment={handleUpdateComment}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;
