import { Layout, Row, Col, Button, Input, Checkbox, Select } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../../hooks";
// import generator from "generate-password";
import { getToken } from "../../../utils/helper";

const AdminCreateUser = () => {
  // state
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  // const [password, setPassword] = useState(generator.generate({ length: 8 }));
  const [password, setPassword] = useState("userpassword");
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // function
  const handleSubmit = async (e) => {
    const token = getToken();
    const config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    e.preventDefault();
    try {
      setLoading(true);
      // console.table({
      //   first_name,
      //   last_name,
      //   email,
      //   website,
      //   password,
      //   role,
      //   checked,
      //   isAdmin,
      // });
      const { data } = await axios.post(
        "/api/users/create-user",
        {
          first_name,
          last_name,
          email,
          website,
          password,
          role,
          checked,
          isAdmin,
        },
        config
      );
      if (data.error) {
        updateNotification("error", data.error);
        setLoading(false);
      } else {
        updateNotification("success", "User created successfully");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      updateNotification(
        "error",
        "Signup failed, check your credentials and Try again"
      );
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  // show form
  return (
    <Layout>
      <Row>
        <Col span={12} offset={6}>
          <h4 style={{ marginBottom: "-10px" }}>Add New User</h4>
          <div className="flex">
            <Input
              style={{ margin: "20px 0px 10px 0px" }}
              size="large"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />
            <Input
              style={{ margin: "20px 0px 10px 0px" }}
              size="large"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            />
          </div>
          <Input
            style={{ margin: "10px 0px 10px 0px" }}
            size="large"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            style={{ margin: "10px 0px 10px 0px" }}
            size="large"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => setPassword("tkpassword")}
              type="default"
              size="large"
              style={{ margin: "10px 0px 10px 0px" }}
            >
              Generate password
            </Button>
            <Input.Password
              style={{ margin: "10px 0px 10px 0px" }}
              size="large"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Select
            defaultValue="Role"
            style={{ margin: "10px 0px 10px 0px", width: "100%" }}
            onChange={(e) => setRole(e)}
          >
            <Select.Option value="Subscriber">Subscriber</Select.Option>
            <Select.Option value="Author">Author</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
          </Select>

          <Select
            defaultValue="isAdmin"
            style={{ margin: "10px 0px 10px 0px" }}
            onChange={(e) => setIsAdmin(e)}
          >
            <Select.Option value="true">true</Select.Option>
            <Select.Option value="false">false</Select.Option>
          </Select>

          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          >
            Send the new user an email about their account.
          </Checkbox>

          <Button
            onClick={handleSubmit}
            type="default"
            style={{ margin: "10px 0px 10px 0px" }}
            loading={loading}
            block
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default AdminCreateUser;
