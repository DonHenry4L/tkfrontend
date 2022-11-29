import { List } from "antd";

const PostsList = ({ posts, handleDelete, handleEdit }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(item) => (
        <List.Item
          actions={[
            <button onClick={() => handleEdit(item)}>edit</button>,
            <button onClick={() => handleDelete(item)}>delete</button>,
          ]}
        >
          <List.Item.Meta title={item.title} />
        </List.Item>
      )}
    />
  );
};

export default PostsList;
