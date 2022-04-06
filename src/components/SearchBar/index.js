import React from 'react'

export default function SearchBar({getInput, submitInput}) {
  return (
    <div>
      <div>
          <input type="text" onChange={getInput}></input>
          <input type="submit" value="SEARCH" onClick={submitInput}></input>
      </div>
    </div>
  )
}
