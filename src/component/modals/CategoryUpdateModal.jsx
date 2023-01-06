import { Modal, Form, Input, Button } from "antd";
// import { EditOutlined } from "@ant-design/icons";

const CategoryUpdateModal = ({
  open,
  setVisible,
  handleUpdate,
  updatingCategory,
}) => {
  return (
    <Modal
      title="Update category"
      open={open}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <Form
        onFinish={handleUpdate}
        fields={[{ name: ["name"], value: updatingCategory.name }]}
      >
        <Form.Item name="name">
          <Input
          //   prefix={
          //   <EditOutlined className="site-form-item-icon" />
          // }
            placeholder="Give it a name"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default CategoryUpdateModal;
