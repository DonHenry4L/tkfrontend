import { Form, Select } from "antd";
import React from "react";

const SortOptionsComponent = ({ setSortOption }) => {
  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
    >
      <Form.Item label="SORT BY">
        <Select
          placeholder="Open This Select Menu"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <Select.Option value="price_1">Price: Low To High</Select.Option>
          <Select.Option value="price_-1">Price: High To Low</Select.Option>
          <Select.Option value="rating_-1">Customer Rating</Select.Option>
          <Select.Option value="name_1">Name A-Z</Select.Option>
          <Select.Option value="name_-1">Name Z-A</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SortOptionsComponent;
