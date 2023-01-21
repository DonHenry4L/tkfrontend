import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
// import { Button } from "antd";
import { Rating } from "react-simple-star-rating";
import AddedToCartMessageComponent from "../../../AddedToCartMessageComponent";
import ImageZoom from "js-image-zoom";
import { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import HeaderComponent from "../../../HeaderComponent";
import MetaComponent from "../../../../component/MetaComponent";

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  getProductDetails,
  userInfo,
  writeReviewApiRequest,
  authInfo,
}) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productReviewed, setProductReviewed] = useState(false);

  const messageEndRef = useRef(null);

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };

  useEffect(() => {
    if (product.images) {
      var options = {
        width: 400,
        height: 250,
        zoomWidth: 200,
        // fillContainer: true,
        // zoomPosition: "bottom"
        scale: 2,
        offset: { vertical: 0, horizontal: 0 },
      };

      product.images.map(
        (image, id) =>
          new ImageZoom(document.getElementById(`imageId${id + 1}`), options)
      );
    }
  }, []);

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id, productReviewed]);

  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    };
    if (e.currentTarget.checkValidity() === true) {
      writeReviewApiRequest(product._id, formInputs)
        .then((data) => {
          if (data === "review created") {
            setProductReviewed("You successfully reviewed the page");
          }
        })
        .catch((er) =>
          setProductReviewed(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }
  };

  useEffect(() => {
    if (productReviewed) {
      setTimeout(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [productReviewed]);

  return (
    <>
      <MetaComponent title={product.name} description={product.description} />
      <HeaderComponent />
      <Container>
        <AddedToCartMessageComponent
          showCartMessage={showCartMessage}
          setShowCartMessage={setShowCartMessage}
        />
        <Row className="mt-5 justify-around">
          {loading ? (
            <h2 className="spinner">Loading product details...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <>
              <Col style={{ zIndex: 1 }} md={4}>
                {product.images
                  ? product.images.map((image, id) => (
                      <div key={id}>
                        <div key={id} id={`imageId${id + 1}`}>
                          <Image
                            crossOrigin="anonymous"
                            fluid
                            src={`${image.path ?? null}`}
                          />
                        </div>
                        <br />
                      </div>
                    ))
                  : null}
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={8}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <h1>{product.name}</h1>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Rating
                          readonly
                          size={20}
                          initialValue={product.rating}
                        />{" "}
                        ({product.reviewsNumber})
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Price <span className="fw-bold">${product.price}</span>
                      </ListGroup.Item>
                      <ListGroup.Item>{product.description}</ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={4}>
                    <ListGroup>
                      <ListGroup.Item>
                        Status:{" "}
                        {product.count > 0 ? "in stock" : "out of stock"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Price <span className="fw-bold">${product.price}</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Quantity:
                        <Form.Select
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          size="lg"
                          aria-label="Default select example"
                        >
                          {[...Array(product.count).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button onClick={addToCartHandler} type="danger">
                          Add To Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-5">
                    <h5>REVIEWS</h5>
                    <ListGroup variant="flush">
                      {product.reviews &&
                        product.reviews.map((review, idx) => (
                          <ListGroup.Item key={idx}>
                            {review.user.name} <br />
                            <Rating
                              readonly
                              size={20}
                              initialValue={review.rating}
                            />
                            <br />
                            {review.createdAt.substring(0, 10)} <br />
                            {review.comment}
                          </ListGroup.Item>
                        ))}
                      <div ref={messageEndRef} />
                    </ListGroup>
                  </Col>
                </Row>
                <hr />
                {!authInfo.profile.username && (
                  <Alert variant="danger">Login first to write a review</Alert>
                )}

                <Form onSubmit={sendReviewHandler}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Write a review</Form.Label>
                    <Form.Control
                      name="comment"
                      required
                      as="textarea"
                      disabled={!authInfo.profile.username}
                      rows={3}
                    />
                  </Form.Group>
                  <Form.Select
                    name="rating"
                    required
                    disabled={!authInfo.profile.username}
                    aria-label="Default select example"
                  >
                    <option value="">Your Rating</option>
                    <option value="5">5 (very good)</option>
                    <option value="4">4 (good)</option>
                    <option value="3">3 (average)</option>
                    <option value="2">2 (bad)</option>
                    <option value="1">1 (awful)</option>
                  </Form.Select>
                  <Button
                    disabled={!authInfo.profile.username}
                    type="submit"
                    className="mb-3 mt-3"
                  >
                    Submit
                  </Button>
                  {productReviewed}
                </Form>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default ProductDetailsPageComponent;
