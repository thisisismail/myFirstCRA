import React from 'react';
import './styles/albumStyle.css';

const Album = ({getUserID, getInputPlaylist, playlist}) => {
  return (
      <div className="Album-item">
        <form onSubmit={getUserID}>
          <ul>
            <li>
              <label>Title</label><br></br>
              <input 
                type="text" 
                name="title" 
                value={playlist.title} 
                onChange={getInputPlaylist}>
              </input>
            </li>
            <li>
              <label>Description</label><br></br>
              <textarea 
                type="text" 
                name="description" 
                value={playlist.description} 
                onChange={getInputPlaylist}></textarea>
            </li>
          </ul>
          <button type="submit" className="">CREATE PLAYLIST</button>
        </form>
      </div>
  );
};

export default Album;