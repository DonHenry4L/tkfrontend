import { Card, Button, Row, Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";

const ProductForListComponent = ({
  productId,
  reviewsNumber,
  rating,
  price,
  description,
  name,
  images,
}) => {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        <Col lg={5}>
          <Card.Img
            crossOrigin="anonymous"
            variant="top"
            src={images[0] ? images[0].path : ""}
          />
        </Col>
        <Col lg={7}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>
              <Rating readonly size={20} initialValue={rating} /> (
              {reviewsNumber})
            </Card.Text>
            <Card.Text className="h4">
              ${price}{" "}
              <Link to={`/product-details/${productId}`}>
                <Button variant="danger">See product</Button>
              </Link>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductForListComponent;
