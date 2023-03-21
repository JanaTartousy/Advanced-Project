import { Button, IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import SearchBar from "./searchBar";
import { useState, useEffect } from "react";
import "./pageHeader.css";

function PageHeader(props) {
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleMediaQueryChange = (e) => {
      setIsLargeScreen(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="page-header">
      <div
        className={
          isLargeScreen
            ? "page-header-content-large"
            : "page-header-content-small"
        }
      >
        <h2 style={{ marginRight: "20px" }}>{props.pageName}</h2>{" "}
        <div className="add-button-parent">
          {props.hideAdd === true ? (
            <></>
          ) : isLargeScreen ? (
            <Button
              startIcon={<FaPlus />}
              style={{
                fontSize: "1rem",
                backgroundColor: "var(--main)",
                color: "var(--accent)",
                marginRight: "1rem",
                fontWeight: "bolder",
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
          ) : (
            <IconButton onClick={props.onAddClick}>
              <FaPlus
                style={{
                  fontSize: "2rem",
                  color: "var(--main)",
                }}
              />
            </IconButton>
          )}
          {!isLargeScreen || props.hideSearch === true ? (
            <></>
          ) : (
            <SearchBar
              searchQuery={props.searchQuery}
              handleSearchChange={props.handleSearchChange}
            ></SearchBar>
          )}
        </div>
      </div>
      {isLargeScreen || props.hideSearch===true?<></> :(
        <SearchBar
          searchQuery={props.searchQuery}
          handleSearchChange={props.handleSearchChange}
        ></SearchBar>
      )}
    </div>
  );
}

export default PageHeader;
