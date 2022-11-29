import React from "react";
import { Form } from "react-bootstrap";

const CategoryFilterComponent = () => {
  return (
    <>
      <span className="font-bold">Category</span>
      <Form>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx}>
            <Form.Check type="checkbox" id={`check-api2-${idx}`}>
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label className="cursor-pointer">
                Category -{idx}
              </Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form>
    </>
  );
};

export default CategoryFilterComponent;
