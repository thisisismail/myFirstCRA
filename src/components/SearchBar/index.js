import React from 'react';

export default function SearchBar({getInputSearch, handleBtnSearch}) {
  return (
    <div>
      <div>
          <input type="text" onChange={getInputSearch}></input>
          <input type="submit" value="SEARCH" onClick={handleBtnSearch}></input>
      </div>
    </div>
  )
}
