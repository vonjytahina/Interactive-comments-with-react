import React, { useEffect, useState } from "react";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";
import Comment from "./Comment";
import AddComment from "./AddComments";

// Define a function that takes a date as an argument
// and returns a string that represents how long ago the date was
function timeAgo(input) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}

// parent comments component
const Comments = ({handleVignet}) => {
  // comments state
  const [backendComments, setBackendComments] = useState([]);

  const [showDeleteBox, setshowDeleteBox] = useState(false);
  // parent comments and sort by score

  const [deleteId, setDeleteId] = useState("")
  const rootComments = backendComments
    .filter((backendComment) => backendComment.parentId === null)
    .sort((a, b) => b.score - a.score);

  // replies comments and sort by date
  const getReplies = (commentId) => {
    const replies = backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    return replies.map((reply) => ({
      ...reply,
      relativeCreatedAt: timeAgo(reply.createdAt),
      // nested replies comments
      nestedReplies: getReplies(reply.id),
    }));
  };

  // add comment
  const addComment = async (text, parentId) => {
    try {
      const comment = await createCommentApi(text, parentId);
      comment.relativeCreatedAt = timeAgo(comment.createdAt);
      setBackendComments([comment, ...backendComments]);
    } catch (error) {
      console.log(error);
    }
  };

  // handle score and update comments
  const handleVote = (commentId, voteType) => {
    console.log(
      "handleVoote handleVootehandleVootehandleVootehandleVootehandleVootehandleVoote"
    );
    const updatedComments = updateCommentScore(
      backendComments,
      commentId,
      voteType
    );
    setBackendComments(updatedComments);
  };

 

  const updateCommentScore = (comments, targetId, voteType) => {
    return comments.map((comment) => {
      if (comment.id === targetId) {
        return {
          ...comment,
          score: voteType === "up" ? comment.score + 1 : comment.score - 1,
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentScore(comment.replies, targetId, voteType),
        };
      }
      return comment;
    });
  };

  const handleDelete = (commentId) => {
    setDeleteId(commentId)
    handleVignet(true)
    setshowDeleteBox(true);
  };

  const handleCancelDelete = () => {
    handleVignet(false)
    setshowDeleteBox(false);
  }

  const handleConfirmDelete = () => {
    handleVignet(false)
    setshowDeleteBox(false);
    deleteCommentApi(deleteId).then(() => {
      const updatedBackendComments = backendComments.filter(backendComment => backendComment.id !== deleteId)
      setBackendComments(updatedBackendComments)
    })
  }

  // fetch comments
  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <>
      {/* show each comment by calling comment component with props */}
      {rootComments.map((rootComment) => {
        return (
          <Comment
            key={rootComment.id}
            comment={{
              ...rootComment,
              relativeCreatedAt: timeAgo(rootComment.createdAt),
            }}
            replies={getReplies(rootComment.id)}
            handleVote={(commentId, voteType) =>
              handleVote(commentId, voteType)
            }
            handleDelete={(commentId) => handleDelete(commentId)}
            handleAddReply={(parentId, replyText) => addComment(replyText, parentId)}
            handleUpdateComment={(commentId, updatedText) => {
              updateCommentApi(backendComments, commentId, updatedText).then(
                (updatedComments) => {
                  setBackendComments(updatedComments);
                }
              );
            }}
          />
        );
      })}
      <AddComment handleSubmit={addComment} />
      {showDeleteBox && (
        <div class="delete-confirmation">
          <h3>Delete comment</h3>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div class="buttons-container">
            <button class="no" onClick={handleCancelDelete}>no, cancel</button>
            <button class="yes" onClick={handleConfirmDelete}>yes, delete</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
