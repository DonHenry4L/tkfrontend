import {
  Col,
  Row,
  Card,
  Avatar,
  Typography,
  Divider,
  Button,
  List,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNotification } from "../../../hooks";
import ReactQuill from "react-quill";
import useCategory from "../../../hooks/useCategory";
import useLatestPosts from "../../../hooks/useLatestPosts";
import CommentForm from "../comment/CommentForm";
import { getToken } from "../../../utils/helper";
import { getSinglePost } from "../../../api/post/SinglePost";

const { Meta } = Card;
const { Title } = Typography;

const SinglePost = ({ postComments }) => {
  const [post, setPost] = useState({});
  const [ready, setReady] = useState(false);
  const { slug } = useParams();
  const { updateNotification } = useNotification();

  // comments
  const [comments, setComments] = useState(postComments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // hooks
  const { categories } = useCategory();
  const { latestPosts } = useLatestPosts();

  const handleSubmit = async () => {
    const token = getToken();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/api/post/createComment/${post._id}`,
        {
          comment,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setComments([data, ...comments]);
      setComment("");
      updateNotification("success", "Comment posted successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchAllPosts = async () => {
    const { error, post, comments } = await getSinglePost(slug);
    if (error) return updateNotification("error", error);
    setReady(true);
    setPost(post);
    setComments(comments);
  };

  useEffect(() => {
    if (slug) fetchAllPosts();
  }, [slug]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait...
        </p>
      </div>
    );
  return (
    <Row className="dark:text-white">
      {/* <Helmet>
        <title>TkSarl | {post.title}</title>
        <meta description={post.content.substring(0, 160)} />
      </Helmet> */}
      <Col xs={24} xl={16}>
        <Card
          className="dark:bg-black dark:text-white"
          cover={
            <img
              src={post?.featuredImage?.url || ""}
              alt={post.title}
              className="aspect-video  blur-none object-center text-white"
            />
          }
        >
          <Title className=" absolute top-80 left-auto">
            <p className="text-white">{post.title}</p>
          </Title>
          <div className="absolute top-[25rem] w-80 bg-transparent text-white left-0">
            <ReactQuill
              defaultValue={post.content}
              readOnly={true}
              theme="bubble"
            />
          </div>
          <p className="mt-10">
            {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} / 0 Comments /
            in{" "}
            {post?.categories.map((c) => (
              <span key={c._id}>
                <Link to={`/category/${c.slug}`}>{c.name}</Link>
              </span>
            ))}
          </p>
          {/* Editor */}
          <div className="dark:bg-slate-700 dark:text-white bg-gray-400 border-2 dark:border-0">
            <ReactQuill
              defaultValue={post.content}
              readOnly={true}
              theme="bubble"
            />
          </div>

          {/* Comment */}
          <CommentForm
            comment={comment}
            setComment={setComment}
            handleSubmit={handleSubmit}
            loading={loading}
          />

          <div style={{ marginBottom: 50 }}></div>
          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
              <List.Item key={item._id} id={item._id}>
                <List.Item.Meta
                  avatar={<Avatar>{item?.postedBy?.name?.charAt(0)}</Avatar>}
                  title={item?.postedBy?.name}
                  description={`${item.content} - ${dayjs(
                    item.createdAt
                  ).fromNow()}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xs={22} xl={6} offset={1}>
        <Divider className="dark:text-white">Categories</Divider>

        {categories.map((c) => (
          <Link to={`/category/${c.slug}`} key={c._id}>
            <Button
              style={{ margin: 2 }}
              className="dark:bg-blue-600 dark:text-white"
            >
              {c.name}
            </Button>
          </Link>
        ))}

        <Divider className="dark:text-white">Latest Posts</Divider>
        {latestPosts.map((p) => (
          <Link to={`/post/${p.slug}`} key={p._id}>
            <h4 className="dark:text-white">{p.title}</h4>
          </Link>
        ))}
      </Col>
    </Row>
  );
};

export default SinglePost;
