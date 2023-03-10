import { Search } from "@mui/icons-material";

function SearchBar(props) {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={props.searchQuery}
          onChange={props.handleSearchChange}
        />
        <Search />
      </div>
    );
  }
  export default SearchBar