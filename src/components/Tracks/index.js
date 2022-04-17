// import React from 'react';
// import './styles/tracksStyle.css';
// import AddPlaylistButton from '../Button/AddPlaylistButton.js'

// export default function Tracks({apidata, setSelectedsongURI, selectedsongURI, setSelectedsongTitle, selectedsongTitle}) {

//   let iteration = 0;

//   function msecToSec(ms) {
//     var minutes = Math.floor(ms / 60000);
//     var seconds = ((ms % 60000) / 1000).toFixed(0);
//     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
//   }

//   const trackAlbumFiltered = apidata.map((v) => (
//     <div className="trackAlbumContainer" key={v.id}>
//       <div id="numbering">{iteration += 1}</div>
//       <div id="track-image"><img src={v.album.images[2].url} alt="GIF"></img></div>
//       <div id="track-title">{v.name}</div>
//       <div id="track-artist">{v.album.artists[0].name}</div>
//       <div id="track-type"> {v.type}</div>
//       <div id="duration">{msecToSec(v.duration_ms)}</div>
//       <div id="select-btn">
//         <AddPlaylistButton 
//           uri={v.uri} title={v.name} 
//           setSelectedsongURI={setSelectedsongURI} 
//           selectedsongURI={selectedsongURI} 
//           setSelectedsongTitle={setSelectedsongTitle}
//           selectedsongTitle={selectedsongTitle}
//         />
//       </div>
//     </div>
//   ));

//   return(
//     <div className='track-items'>{trackAlbumFiltered}</div>
//   );
// }