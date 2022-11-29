import React from "react";
import { Input, Button } from "antd";
import { useAuth } from "../../../hooks";

const { TextArea } = Input;

const CommentForm = ({ comment, setComment, handleSubmit, loading }) => {
  // context
  const { authInfo } = useAuth();

  return (
    <>
      <br />
      <TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        rows="4"
        disabled={authInfo === null && authInfo?.token === ""}
        maxLength={200}
      />
      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={comment === ""}
        style={{ marginTop: 4 }}
        type="primary"
        className="dark:text-white text-primary dark:bg-blue-500"
      >
        Post
      </Button>
    </>
  );
};

export default CommentForm;
