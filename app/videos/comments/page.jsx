"use client";
import { useState } from "react";
import { authors, mockData } from "./mockData";
import { v4 } from "uuid";
const Comments = () => {
  const [data, setData] = useState(mockData);
  const [newComment, setNewComment] = useState("");
  const [replyCommentId, setReplyCommentId] = useState(0);
  console.log(v4());
  function handleAddComment() {
    const newData = [...data];
    traverse(newData);
    setData(newData);
    setReplyCommentId(0);
    setNewComment("");
    function traverse(currentComment) {
      // Adding a new comment in the recursive DS  is tricky.Explain as best as possible.
      for (const comment of currentComment) {
        if (comment.id === replyCommentId) {
          const newId = v4();
          comment.children.push({
            id: newId,
            comment: newComment,
            children: [],
          });
          return;
        }
        traverse(comment.children);
      }
    }
  }
  function displayComments(data, marginLeft = 0, html = []) {
    // This is difficult to write. Understand the approach. What should this function do? What should it actually return
    // html should be an array, string. What?

    data.forEach((eachComment) => {
      html.push(
        <div style={{ marginLeft }}>
          <span>
            {eachComment.comment} - {authors.get(eachComment.authorId)}
          </span>
          <button
            onClick={() => {
              setReplyCommentId(eachComment.id);
            }}
          >
            Reply
          </button>
          {replyCommentId === eachComment.id && (
            <div>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleAddComment}>Add comment</button>
            </div>
          )}
        </div>
      );
      if (eachComment.children.length) {
        displayComments(eachComment.children, marginLeft + 20, html);
      }
    });

    // Should this be returned?
    return html;
  }
  return <div>{displayComments(data)}</div>;
};

export default Comments;
