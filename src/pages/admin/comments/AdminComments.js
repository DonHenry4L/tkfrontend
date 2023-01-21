import { Col, Input, Layout, List, Row, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks";
import { getToken } from "../../../utils/helper";
import dayjs from "dayjs";

import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

const AdminComments = () => {
  //state
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  //context
  const { authInfo } = useAuth();

  const fetchComments = async () => {
    const token = getToken();
    const config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    try {
      const { data } = await axios.get(`/api/post/comments/${page}`, config);
      setComments([...comments, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/post/comment-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (comment) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!answer) return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authInfo) {
      fetchComments();
      getTotal();
    }
  }, [authInfo]);

  useEffect(() => {
    if (page === 1) return;
    if (authInfo) fetchComments();
  }, [page]);

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <h1 style={{ marginTop: 15 }}>{comments?.length} Comments</h1>

          <Input
            placeholder="Search"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />

          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
              <List.Item actions={[]}>
                <List.Item.Meta
                  description={`On ${item?.postId?.title} | ${
                    item?.postedBy?.username
                  } | ${dayjs(item.createdAt).format("L LT")}`}
                  title={item.content}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Button
            size="large"
            type="primary"
            loading={loading}
            onClick={() => setPage(page + 1)}
          >
            Load More
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

{
  /* <pre>{JSON.stringify(comments, null, 4)}</pre> */
}

export default AdminComments;
