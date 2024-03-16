"use client";
import { useState } from "react";
const users = [
  {
    id: 1,
    name: "Amar",
  },
  {
    id: 2,
    name: "Akbar",
  },
  {
    id: 3,
    name: "Anthony",
  },
];

const data = [
  {
    id: 1,
    userId: 1,
    text: "This is a comment",
    showChildren: false,
    children: [
      {
        id: 2,
        userId: 2,
        text: "This is another comment",
        showChildren: false,
        children: [],
      },
      {
        id: 3,
        userId: 3,
        text: "This is yet another comment",
        showChildren: false,
        children: [],
      },
    ],
  },
  {
    id: 4,
    userId: 1,
    text: "comment this is",
    showChildren: false,
    children: [
      {
        id: 5,
        userId: 2,
        text: "another comment this is",
        showChildren: false,
        children: [],
      },
      {
        id: 6,
        userId: 3,
        text: "yet another comment this is",
        showChildren: false,
        children: [
          {
            id: 7,
            userId: 1,
            text: "This is a comment",
            showChildren: false,
            children: [],
          },
        ],
      },
    ],
  },
];

const CommentsPage = () => {
  const [comments, setComments] = useState(data);
  const [currentCommentId, setCurrentCommentId] = useState(0);
  const [currentCommentText, setCurrentCommentText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(1);
  // renderComments();
  // addComment(7, 2, "Dynamically added comment");
  const addComment = (id, userId, text) => {
    const newComments = JSON.parse(JSON.stringify(comments));
    util(newComments);
    function util(currComments) {
      for (let i = 0; i < currComments.length; i++) {
        if (currComments[i].id === id) {
          currComments[i].children.push({
            id: 8,
            userId,
            text,
            children: [],
          });
          break;
        } else {
          if (currComments[i].children.length) {
            util(currComments[i].children);
          }
        }
      }
    }
    console.log("newComments", newComments);
    setComments(newComments);
  };

  const handleShowChildren = (id, status) => {
    const newComments = JSON.parse(JSON.stringify(comments));
    util(newComments);
    function util(currComments) {
      for (let i = 0; i < currComments.length; i++) {
        if (currComments[i].id === id) {
          currComments[i].showChildren = status;
          break;
        } else {
          if (currComments[i].children.length) {
            util(currComments[i].children);
          }
        }
      }
    }
    console.log("newComments", newComments);
    setComments(newComments);
  };
  const renderComments = () => {
    let commentsHtml = [];
    util(comments);

    function util(currComments, level = 0) {
      currComments.forEach(({ id, userId, text, children, showChildren }) => {
        commentsHtml.push(
          <div>
            <div
              className="flex gap-8"
              style={{
                marginLeft: `${level * 100}px`,
              }}
            >
              {!!children.length &&
                (showChildren ? (
                  <button
                    onClick={() => {
                      handleShowChildren(id, false);
                    }}
                  >
                    -
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleShowChildren(id, true);
                    }}
                  >
                    +
                  </button>
                ))}
              {text}
              <button
                onClick={() => {
                  setCurrentCommentId(id);
                }}
                className="bg-slate-300 justify-end"
              >
                Reply
              </button>
            </div>

            {currentCommentId === id ? (
              <div>
                <input
                  onChange={(e) => setCurrentCommentText(e.target.value)}
                  value={currentCommentText}
                  className="text-blue-500"
                />
                <button
                  onClick={() => {
                    addComment(id, 3, currentCommentText);
                    setCurrentCommentText("");
                    setCurrentCommentId(0);
                  }}
                >
                  Add
                </button>
              </div>
            ) : null}
          </div>
        );
        if (children.length && showChildren) {
          util(children, level + 1);
        }
      });
    }
    return commentsHtml;
  };
  return (
    <div>
      <div>
        <div className="flex justify-end gap-4 mr-4">
          {users.map(({ id, name }) => (
            <button
              key={id}
              className={selectedUserId === id ? "bg-blue-200" : ""}
              onClick={() => setSelectedUserId(id)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div className="px-16">
        <div className="py-16">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div>{renderComments()}</div>
        <button onClick={() => addComment(6, 3, "Dynamically added comment")}>
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentsPage;
