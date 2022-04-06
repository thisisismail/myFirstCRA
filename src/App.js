import Album from './components/Album/index.js';
import SpotifySearch from './components/Spotify/index.js';
import './App.css';

function App() {

  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      
      <header className="App-header">
      </header>
      
      <div className="App-body">
        <div className="Album-container">
        {/* <Album/> */}
        </div>
        <SpotifySearch/>
      </div>
      
    </div>
  );
}

export default App;
