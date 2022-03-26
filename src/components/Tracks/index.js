import React from 'react';
import './styles/tracksStyle.css'
import data from '../../data/trackSpotify';

const Tracks = (props) => {

  let iteration = 0;

  function msecToSec(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  function filtering (comparedData){
    return comparedData === props.name; /**props.[any variable you want to pass to the next state]  , i will make it 'name' to make it easier*/
  }/**filtering function, filter so that only tracks related to the same album is listed */
  
  const trackAlbumFiltered = data.filter((v) => filtering(v.album.name)).map((v) => (
    <div>
      <h3 id="numbering">{iteration += 1}</h3>
      <h3 key={v.id}>{v.name}</h3>
      <h4 key={v.id}>{v.album.artists[0].name},
        <span id="track-sign"> {v.type}</span>
        <span id="duration">{msecToSec(v.duration_ms)}</span>
      </h4>
    </div>
  )); /**filtering then mapping */

  return(
    <div className='track-items'>{trackAlbumFiltered}</div>
  );
}

export default Tracks;