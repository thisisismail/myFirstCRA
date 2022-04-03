import Album from './components/Album/index.js';
import spotify from './data/spotify.json';
import SpotifyAPIFirstStep from './components/Spotify/SpotifyAPIFirstStep.js'
import './App.css';

function App() {

  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      
      <header className="App-header">
      </header>
      
      <body className="App-body">
        <div className="Album-container">
          <SpotifyAPIFirstStep/>
          {/* <Album */}
            {/* image={spotify.album.images[0].url} 
            name={spotify.album.name} 
            type={spotify.album.type} */}
            {/* artist={spotify.album.artists[0].name}/> */}
          
          {/* <Album */}
            {/* image={spotify.album.images[0].url} 
            name={spotify.album.name} 
            type={spotify.album.type} */}
            {/* artist={spotify.album.artists[0].name}/> */}
          
          {/* <Album */}
            {/* image={spotify.album.images[0].url} 
            name={spotify.album.name} 
            type={spotify.album.type} */}
            {/* artist={spotify.album.artists[0].name}/> */}
          
        </div>
      </body>
    </div>
  );
}

export default App;
