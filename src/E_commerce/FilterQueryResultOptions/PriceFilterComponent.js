import { Form } from "react-bootstrap";

const PriceFilterComponent = ({ price, setPrice }) => {
  return (
    <>
      <div className="">
        <Form.Label>
          <span className="font-bold text-gray-500">
            Price no greater than:
          </span>{" "}
          <span className="text-gray-500">${price}</span>
        </Form.Label>
        <Form.Range
          min={10}
          max={1000}
          step={10}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </>
  );
};

export default PriceFilterComponent;
