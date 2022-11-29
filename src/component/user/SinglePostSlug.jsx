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
import ReactQuill from "react-quill";
import { Helmet } from "react-helmet";
import { useNotification } from "../../hooks";
import useCategory from "../../hooks/useCategory";
import useLatestPosts from "../../hooks/useLatestPosts";
import { getToken } from "../../utils/helper";
import client from "../../api/client";
import { getSinglePost } from "../../api/post/SinglePost";
import CommentForm from "../admin/comment/CommentForm";

const { Meta } = Card;
const { Title } = Typography;

const SinglePostSlug = () => {
  const [post, setPost] = useState({});
  const [ready, setReady] = useState(false);
  const { slug } = useParams();
  const { updateNotification } = useNotification();

  // comments
  // const [comments, setComments] = useState(postComments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // hooks
  const { categories } = useCategory();
  const { latestPosts } = useLatestPosts();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await client.post(`/createComment/${post._id}`, {
        comment,
      });
      // setComments([data, ...comments]);
      setComment("");
      updateNotification("success", "Comment posted successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchAllPosts = async () => {
    const { error, post } = await getSinglePost(slug);
    if (error) return updateNotification("error", error);
    setReady(true);
    setPost(post);
    // setPost(comments);
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
      <Helmet>
        <title>Tksarl | {post.title}</title>
        <meta description={post.content.substring(0, 160)} />
      </Helmet>
      <Col xs={24} xl={16}>
        <Card
          className="dark:bg-black dark:text-white"
          cover={
            <img
              src={post?.featuredImage?.url || "No Image to display"}
              alt={post.title}
              className="aspect-video  blur-none object-center relative"
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
          <p>
            {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} / 0 Comments /
            in{" "}
            {post?.categories.map((c) => (
              <span key={c._id}>
                <Link to={`/category/${c.slug}`} className="text-blue-500">
                  {" "}
                  {c.name},{" "}
                </Link>
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
            // dataSource={comments}
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
        <Divider>
          <p className="text-white">Categories</p>
        </Divider>

        {categories.map((c) => (
          <Link to={`/category/${c.slug}`} key={c._id}>
            <Button style={{ margin: 2 }} className="">
              {c.name}
            </Button>
          </Link>
        ))}

        <Divider>
          <p className="text-white">Latest Posts</p>
        </Divider>
        {latestPosts.map((p) => (
          <Link to={`/post/${p.slug}`} key={p._id}>
            <h4 className="dark:text-white">{p.title}</h4>
          </Link>
        ))}
      </Col>
    </Row>
  );
};

export default SinglePostSlug;
