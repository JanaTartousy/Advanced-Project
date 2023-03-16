import { Pagination } from "@mui/material";
import "./pagination.css"
function PaginationContainer({ currentPage, lastPage, onPageChange }) {
    return (
      <div className="pagination-container">
        <Pagination
          count={lastPage}
          page={currentPage}
          onChange={onPageChange}
          variant="outlined"
          size="medium"
          showFirstButton
          showLastButton
          className="pagination"
        />
      </div>
    );
  }
export default PaginationContainer  