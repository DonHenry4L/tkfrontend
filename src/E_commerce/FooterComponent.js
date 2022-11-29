import { Col, Row } from "antd";
import React from "react";

const FooterComponent = () => {
  return (
    <footer>
      <div className="mx-auto">
        <Row className="mt-5">
          <Col className="bg-black text-white text-center py-5 w-full">
            Copyright &copy; TKSarl Best Online Shop
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default FooterComponent;
