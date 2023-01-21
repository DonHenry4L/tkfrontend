import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const PaginationComponent = ({
  categoryName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}) => {
  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/product-list/${category}${search}`;

  return (
    <Pagination>
      <Link to={`${url}${pageNum - 1}`}>
        <Pagination.Prev disabled={pageNum === 1} />
      </Link>
      {[...Array(paginationLinksNumber).keys()].map((x) => (
        <Link key={x + 1} to={`${url}${x + 1}`}>
          <Pagination.Item active={x + 1 === pageNum}>{x + 1}</Pagination.Item>
        </Link>
      ))}
      <Link
        disabled={pageNum === paginationLinksNumber}
        to={`${url}${pageNum + 1}`}
      >
        <Pagination.Next />
      </Link>
    </Pagination>
  );
};

export default PaginationComponent;
