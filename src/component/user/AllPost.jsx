import { Col, Row, Card, Avatar } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data } = await axios.get("/api/post/posts");
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       const fetchPosts = async () => {
  //         const res = await axios("/posts");
  //         const data = await res.json();
  //         setPosts(data);
  //       };
  //       fetchPosts();
  //     }, 15000);
  //     return () => clearInterval(interval);
  //   }, []);
  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 6 }}
      className="dark:text-white md:grid-cols-5"
    >
      {posts.map((post, index) => (
        <Col
          className="gutter-row"
          // xs={24}
          // xl={4}
          span={6}
          key={index}
          style={{ marginTop: 5, marginBottom: 5 }}
        >
          <Link to={`/post/${post.slug}`}>
            <Card
              hoverable
              cover={
                <Avatar
                  shape="square"
                  style={{ height: "200px" }}
                  src={post.featuredImage?.url || ""}
                  alt={post.title}
                />
              }
            >
              <Meta title={post.title} />
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default AllPost;
