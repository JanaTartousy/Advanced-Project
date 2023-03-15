import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import SearchBar from "./searchBar";
import "./pageHeader.css";
function PageHeader(props) {
  return (
    <div className="page-header">
      <h2 style={{marginRight:"20px"}}>{props.pageName}</h2>{" "}
      <div className="add-button-parent">
        {props.hideAdd === true ? (
          <></>
        ) : (
          <Button
            startIcon={<FaPlus />}
            style={{
              fontSize: "1rem",
              backgroundColor: "var(--main)",
              color: "var(--accent)",
              marginRight: "1rem",
            }}
            size="large"
            variant="contained"
            sx={{
              "&:hover": {
                transform: "scale(1.05)",
                transition: "0.2s ease-out",
              },
            }}
            onClick={props.onAddClick}
          >
            Add
          </Button>
        )}
        <SearchBar
          searchQuery={props.searchQuery}
          handleSearchChange={props.handleSearchChange}
        ></SearchBar>
      </div>
    </div>
  );
}
export default PageHeader;
