import './App.css';
import PageRouter from './Route/index.js';

function App() {

  return (
    
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      
      <header className="App-header">
      </header>
      
      <div className="App-body">
        {/* <SpotifySearch/> */}
        {/* <LoginPage/> */}
        {/* < LoginPage /> */}
        <PageRouter/>
      </div>
      
    </div>
  );
}

export default App;
