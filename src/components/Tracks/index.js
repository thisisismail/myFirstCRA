import React from 'react';
import './styles/tracksStyle.css';
import AddPlaylistButton from '../Button/AddPlaylistButton.js'

export default function Tracks({apidata, setSelectedsong, selectedsong}) {

  let iteration = 0;

  function msecToSec(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

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
        <AddPlaylistButton uri={v.uri} setSelectedsong={setSelectedsong} selectedsong={selectedsong}/>
      </div>
    </div>
  ));

  return(
    <div className='track-items'>{trackAlbumFiltered}</div>
  );
}