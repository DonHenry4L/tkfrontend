import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const ProductPageComponent = ({ fetchProducts, deleteProduct }) => {
  const [products, setProducts] = useState([]);
  const [productDeleted, setProductDeleted] = useState(false);

  const dispatch = useDispatch()

  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      const data = await deleteProduct(productId);
      if (data.message === "product successfully deleted") {
        setProductDeleted(!productDeleted);
      }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();
    fetchProducts(abctrl)
      .then((res) => setProducts(res))
      .catch((err) =>
      // dispatch(logout())
        setProducts([
          {
            name: err.response.data.message
              ? err.response.data.message
              : err.response.data,
          },
        ])
      );

    return () => abctrl.abort();
  }, [productDeleted]);

  return (
    <Row className="m-5">
      <Col md={10}>
        <h1>
          Product List{" "}
          <Link to="/admin/create-new-product">
            <Button type="primary" size="lg">
              Create New
            </Button>
          </Link>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <Link to={`/admin/edit-product/${item._id}`}>
                    <Button type="primary" className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </Link>
                  {" / "}
                  <Button
                    type="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProductPageComponent;
