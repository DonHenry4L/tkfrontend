import React, { useContext } from "react";
import { Input, Button } from "antd";
import { useAuth } from "../../hooks";

const { TextArea } = Input;

export default function CommentForm({
  comment,
  setComment,
  handleSubmit,
  loading,
}) {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const handleOnChange = ({ target }) => {
    setComment(target.value);
    // console.log(target.value);
  };

  return (
    <>
      <br />
      <TextArea
        value={comment}
        onChange={handleOnChange}
        placeholder="Write a comment..."
        rows="4"
        disabled={isLoggedIn?.user === null && isLoggedIn?.token === ""}
        maxLength={200}
      />
      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={comment === ""}
        style={{ marginTop: 4 }}
        type="primary"
      >
        Post
      </Button>
    </>
  );
}
