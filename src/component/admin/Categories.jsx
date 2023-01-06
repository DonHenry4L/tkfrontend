import { Button, Col, Form, Input, List, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
// import { EditOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { getToken } from "../../utils/helper";
import CategoryUpdateModal from "../modals/CategoryUpdateModal";

import { PostContext } from "../../context/post";
import { useNotification } from "../../hooks";

export default function Categories() {
  // context
  const [post, setPost] = useContext(PostContext);
  // State //
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatingCategory, setUpdatingCategory] = useState({});
  // End State //

  // Hook //
  const { updateNotification } = useNotification();
  const [form] = Form.useForm();
  const { categories } = post;
  // End Hook //

  const onFinish = async (values) => {
    // console.log("values => ", values);
    const token = getToken();
    try {
      setLoading(true);
      const { data } = await axios.post("/category", values, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      setLoading(false);
      setPost((prev) => ({ ...prev, categories: [data, ...categories] }));
      // console.log(data);
      updateNotification("success", "category created Successfully");
      setLoading(false);
      form.resetFields(["name"]);
    } catch (error) {
      // console.log(error);
      updateNotification("error", error);
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    // console.log("Delete Category");
    const token = getToken();
    try {
      const data = await axios.delete(`/category/${item.slug}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      setPost((prev) => ({
        ...prev,
        categories: categories.filter((cat) => cat._id !== data._id),
      }));
      updateNotification("success", "category deleted Successfully");
    } catch (error) {
      updateNotification("error", error);
    }
  };
  const handleEdit = async (item) => {
    setUpdatingCategory(item);
    setVisible(true);
  };

  const handleUpdate = async (values) => {
    const token = getToken();
    try {
      const { data } = await axios.put(
        `/category/${updatingCategory.slug}`,
        values,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      const newCategories = categories.map((cat) => {
        if (cat._id === data._id) {
          return data;
        }
        return cat;
      });
      setPost((prev) => ({ ...prev, categories: newCategories }));
      updateNotification("success", "Category Updated Successfully");
      setVisible(false);
      setUpdatingCategory({});
    } catch (error) {
      return updateNotification("error", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const token = getToken();
    try {
      const { data } = await axios.get("/categories", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      setPost((prev) => ({ ...prev, categories: data }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dark:text-white">
      <Row>
        {/* first Column */}
        <Col xs={22} sm={22} lg={10} offset={1}>
          <p>Add new category</p>
          <Form onFinish={onFinish} form={form}>
            <Form.Item name="name">
              <Input
              //   prefix={
              //   <EditOutlined className="site-form-item-icon" />
              // }
                placeholder="Give it a name"
              />
            </Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
        {/* second column */}
        <Col xs={22} sm={22} lg={10} offset={1}>
          <List
            itemLayout="horizontal"
            dataSource={categories}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <button onClick={() => handleDelete(item)}>
                    <MdDeleteForever className="w-10 h-4 dark:text-white" />
                  </button>,
                  <button onClick={() => handleEdit(item)}>
                    <FaEdit className="w-10 h-4 dark:text-white" />
                  </button>,
                ]}
              >
                <List.Item.Meta title={item.name} />
              </List.Item>
            )}
          ></List>
        </Col>

        <CategoryUpdateModal
          open={visible}
          setVisible={setVisible}
          handleUpdate={handleUpdate}
          updatingCategory={updatingCategory}
        />
      </Row>
    </div>
  );
}
