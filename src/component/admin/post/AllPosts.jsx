import { Col, Row, Card, Avatar } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../../../api/client";

const { Meta } = Card;

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data } = await client("/posts");
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
                  src={post.featuredImage?.url || "/favicon.png"}
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

export default AllPosts;
