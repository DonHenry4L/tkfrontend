import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Alert,
} from "react-bootstrap";
import { Button } from "antd";
import { Rating } from "react-simple-star-rating";
import AddedToCartMessageComponent from "../../../AddedToCartMessageComponent";
import ImageZoom from "js-image-zoom";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import HeaderComponent from "../../../HeaderComponent";
import MetaComponent from "../../../../component/MetaComponent";

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
}) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };

  useEffect(() => {
    var options = {
      width: 400,
      height: 250,
      zoomWidth: 200,
      // fillContainer: true,
      // zoomPosition: "bottom"
      scale: 2,
      offset: { vertical: 0, horizontal: 10 },
    };
    new ImageZoom(document.getElementById("first"), options);
    new ImageZoom(document.getElementById("second"), options);
    new ImageZoom(document.getElementById("third"), options);
    new ImageZoom(document.getElementById("fourth"), options);
  }, []);

  return (
    <>
    <MetaComponent 
    // title={product.name} 
    // description={product.description}
    />
      <HeaderComponent />
      <Container>
        <AddedToCartMessageComponent
          showCartMessage={showCartMessage}
          setShowCartMessage={setShowCartMessage}
        />
        <Row className="mt-5 justify-around">
          <Col style={{ zIndex: 1 }} md={4}>
            <div id="first">
              <Image crossOrigin="anonymous" fluid src="/pic/pic__5.jpg" />
            </div>
            <br />
            <div id="second">
              <Image crossOrigin="anonymous" fluid src="/pic/pic__10.jpg" />
            </div>
            <br />
            <div id="third">
              <Image crossOrigin="anonymous" fluid src="/pic/pic__8.jpg" />
            </div>
            <br />
            <div id="fourth">
              <Image crossOrigin="anonymous" fluid src="/pic/pic__12.jpg" />
            </div>
            <br />
          </Col>
          <Col md={8}>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h1>Product Name</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating readonly size={20} initialValue={4} /> (1)
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price <span className="fw-bold">$345</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup>
                  <ListGroup.Item>Status: in stock</ListGroup.Item>
                  <ListGroup.Item>
                    Price <span className="fw-bold">$345</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Quantity:
                    <Form.Select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      size="lg"
                      aria-label="Default select example"
                    >
                      <option>choose</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
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
                  {Array.from({ length: 10 }).map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      John Doe <br />
                      <Rating readonly size={20} initialValue={4} />
                      <br />
                      20-09-2001 <br />
                      "Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
            <hr />
            <Alert variant="danger">Login first to write a review</Alert>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Write a review</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Form.Select aria-label="Default select example">
                <option>Your Rating</option>
                <option value="5">5 (very good)</option>
                <option value="4">4 (good)</option>
                <option value="3">3 (average)</option>
                <option value="2">2 (bad)</option>
                <option value="1">1 (awful)</option>
              </Form.Select>
              <Button type="primary" className="mb-3 mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetailsPageComponent;
