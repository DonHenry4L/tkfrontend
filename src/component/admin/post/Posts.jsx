import React, { useEffect, useState, useContext } from "react";
import { Button, Col, Input, List, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { PostContext } from "../../../context/post";
import { useAuth, useNotification } from "../../../hooks";
import { getToken } from "../../../utils/helper";
import client from "../../../api/client";
import PostsList from "../../PostLists";

export default function Posts() {
  const [keyword, setKeyword] = useState("");
  const [post, setPost] = useContext(PostContext);

  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  const { posts } = post;
  const { authInfo } = useAuth();

  const fetchPosts = async () => {
    const token = getToken();
    try {
      const { data } = await client("/posts-for-admin", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      setPost((prev) => ({ ...prev, posts: data }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (authInfo) fetchPosts();
  }, [authInfo]);

  const handleDelete = async (post) => {
    const token = getToken();
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await client.delete(`/post/${post._id}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      if (data.ok) {
        setPost((prev) => ({
          ...prev,
          posts: prev.posts.filter((p) => p._id !== post._id),
        }));
      }
      updateNotification("success", "Post Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (post) => {
    // console.log("EDIT POST", post);
    navigate(`/admin/posts/${post.slug}`);
  };

  return (
    <>
      <Row>
        <Helmet>
          <title>Tksarl | Posts</title>
        </Helmet>
        <Col span={24}>
          <Button type="primary">
            <Link to="/admin/posts/new">
              <PlusOutlined /> Add New
            </Link>
          </Button>
          <h1 style={{ marginTop: 15 }}>{posts?.length} Posts</h1>

          <Input
            placeholder="Search"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <PostsList
            posts={posts?.filter((p) => p.title)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Col>
      </Row>
    </>
  );
}
