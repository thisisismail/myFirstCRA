import './App.css';
import Album from './components/Album/index.js';
import SpotifySearch from './components/Spotify/index.js';
import LoginPage from './components/LoginPage/index.js';
import PageRouter from './Route/index.js';

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
        {/* <SpotifySearch/> */}
        {/* <LoginPage/> */}
        <PageRouter/>
        {/* < LoginPage /> */}
      </div>
      
    </div>
  );
}

export default App;
