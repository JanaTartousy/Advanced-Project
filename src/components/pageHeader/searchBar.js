import { Search } from '@mui/icons-material';
import React from 'react';

function SearchBar(props) {
  const searchInputRef = React.useRef(null);

  const handleSearchClick = () => {
    searchInputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f1f3f4',
        borderRadius: '4px',
        padding: '8px',
        minWidth: '200px',
        maxWidth: '400px',
        width: '100%',
      }}
    >
      <Search
        style={{ color: '#919eab', cursor: 'pointer', marginRight: '8px' }}
        onClick={handleSearchClick}
      />
      <input
        ref={searchInputRef}
        style={{
          flexGrow: 1,
          border: 'none',
          outline: 'none',
          fontSize: '1rem',
          backgroundColor: 'transparent',
          color: '#37474f',
          maxWidth: '400px',
          width: '100%',
        }}
        type="text"
        placeholder="Search..."
        value={props.searchQuery}
        onChange={props.handleSearchChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;
