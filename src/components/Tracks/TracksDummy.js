import React from 'react';
import './styles/tracksStyle.css'
// import data from '../../data/trackSpotify';

const TracksDummy = ({apidata}) => {

  let iteration = 0;

  function msecToSec(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  // function filtering (comparedData){
  //   return comparedData === props.name; /**props.[any variable you want to pass to the next state]  , i will make it 'name' to make it easier*/
  // }/**filtering function, filter so that only tracks related to the same album is listed */
  
  const trackAlbumFiltered = apidata.map((v) => (
    <div key={v.id}>
      <h3 id="numbering">{iteration += 1}</h3>
      <img id="cover-image" src={v.album.images[2].url} alt="GIF Image"></img>
      <div id="track-text">
        <h3>{v.name}</h3>
        <h4>{v.album.artists[0].name},
          <span id="track-sign"> {v.type}</span>
          <span id="duration">{msecToSec(v.duration_ms)}</span>
        </h4>
      </div>
    </div>
  )); /**filtering then mapping */

  return(
    <div className='track-items'>{trackAlbumFiltered}</div>
  );
}

export default TracksDummy;