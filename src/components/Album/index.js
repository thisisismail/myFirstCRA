import React from 'react';
import PlayButton from '../Button/PlayButton';
import Tracks from '../Tracks';
import AlbumImage from './AlbumImage';
import AlbumTitle from './AlbumTitle';
import './styles/albumStyle.css';

const Album = ({getUserID}) => {
  return (
      <div className="Album-item">
        <form onSubmit={getUserID}>
          <ul>
            <li>
              <label>Title</label><br></br>
              <input type="text"></input>
            </li>
            <li>
              <label>Description</label><br></br>
              <textarea></textarea>
            </li>
          </ul>
          <button type="submit" className="">CREATE PLAYLIST</button>
        </form>
      </div>
  );
};

export default Album;