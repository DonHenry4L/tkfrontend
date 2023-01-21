import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Col, Image, Input, Modal, Row, Select } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/helper";
import { useNotification } from "../../hooks";
import { MediaContext } from "../../context/Media";
import Media from "../admin/media";

const { Option } = Select;

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

export default function EditPostComponent({ loadPost }) {
  // context
  //   const [theme, setTheme] = useContext(ThemeContext);
  const [media, setMedia] = useContext(MediaContext);
  // state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // media Modal
  const [post, setPost] = useState({});
  // const [media, setMedia] = useContext(MediaContext);
  // hook
  const { updateNotification } = useNotification();
  const { id } = useParams();

  const navigate = useNavigate();

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/categories");
      setLoadedCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handlePublish = async () => {
    const token = getToken();

    setLoading(true);
    const { data } = await axios.post(
      "/api/post/create-post",
      {
        title,
        content,
        categories,
        featuredImage: media?.selected?._id,
      },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );

    if (data?.error) {
      updateNotification("error", data?.error);
      setLoading(false);
    } else {
      // console.log("POST PUBLISHED RES => ", data);
      updateNotification("success", "Post created successfully");
      localStorage.removeItem("post-title");
      localStorage.removeItem("post-content");
      setMedia({ ...media, selected: null });

      // navigate(`/${page}/posts`);
    }
  };

  //   const loadPost = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/post/edit-post/${id.query.slug}`);
  //       console.log("GOT POST FOR EDIT", data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    loadPost(id);
  }, [id]);

  return (
    <Row>
      <Col span={14} offset={1}>
        <h1 className="dark:text-white">Edit post</h1>
        <Input
          size="large"
          value={title}
          placeholder="Give your post a title"
          onChange={(e) => {
            setTitle(e.target.value);
            localStorage.setItem("post-title", JSON.stringify(e.target.value));
          }}
        />
        <br />
        <br />
        <div className="dark:text-white">
          <ReactQuill
            modules={modules}
            theme="snow"
            value={content}
            onChange={setContent}
            style={{ minHeight: "300px" }}
          />
        </div>

        <br />
        <br />
        {/* <pre>{JSON.stringify(loadedCategories, null, 4)}</pre> */}
      </Col>

      <Col span={6} offset={1}>
        <Button
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          onClick={() => setVisible(true)}
          className="dark:bg-white dark:text-blue-500"
        >
          Preview
        </Button>

        <Button
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          onClick={() => setMedia({ ...media, showMediaModal: true })}
          className="dark:bg-white dark:text-blue-500"
        >
          <CloudUploadOutlined />
          Featured Image
        </Button>

        <h4 className="dark:text-white">Categories</h4>

        <Select
          mode="multiple"
          allowClear={true}
          placeholder="Select categories"
          style={{ width: "100%" }}
          onChange={(v) => setCategories(v)}
        >
          {loadedCategories.map((item) => (
            <Option key={item.name}>{item.name}</Option>
          ))}
        </Select>

        {media?.selected && (
          <div style={{ marginTop: "15px" }}>
            <Image width="100%" src={media?.selected?.url} />
          </div>
        )}

        <Button
          loading={loading}
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          type="primary"
          onClick={handlePublish}
          className="dark:bg-blue-500 dark:text-white bg-blue-500"
        >
          Publish
        </Button>
      </Col>
      {/* preview modal */}
      <Modal
        title="Preview"
        centered
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={720}
        footer={null}
      >
        <h1>{title}</h1>

        <ReactQuill defaultValue={content} readOnly={true} theme="bubble" />
      </Modal>
      {/* media modal */}

      <Modal
        open={media.showMediaModal}
        title="Media"
        onOk={() => setMedia({ ...media, showMediaModal: false })}
        onCancel={() => setMedia({ ...media, showMediaModal: false })}
        width={720}
        footer={null}
      >
        <Media />
      </Modal>
      {/* media modal */}
    </Row>
  );
}
