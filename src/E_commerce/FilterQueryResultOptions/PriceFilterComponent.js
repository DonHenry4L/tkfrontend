import { Form } from "react-bootstrap";

const PriceFilterComponent = () => {
  return (
    <>
      <div>
        <Form.Label>
          <span className="font-bold">Price no greater than:</span> 500$
        </Form.Label>
        <Form.Range min={10} max={1000} step={10} />
      </div>
    </>
  );
};

export default PriceFilterComponent;
