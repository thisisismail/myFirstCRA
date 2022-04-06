import React from 'react';
import {useState, useEffect} from 'react';
import SearchBar from '../SearchBar';
import TracksDummy from '../Tracks/TracksDummy.js';

const ID = '8699333de5604b2587b73f95f3c2daa7';
const REDIRECT_URI = 'http://localhost:3000';
const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${ID}&scope=playlist-modify-private&redirect_uri=${REDIRECT_URI}`;

export default function DummySpotifyResult() {

  const [getauthapi, setGetauthapi] = useState('');
  const [submitgetauthapi, setSubmitgetauthapi] = useState(false);
  const [input, setInput] = useState('');
  const [submitinput, setSubmitinput] = useState(false);
  const [message, setMessage] = useState('YOU ARE NOT AUTHORIZED');
  const [login, setLogin] = useState('LOGIN');
  const [apidata, setApidata] = useState([]);
  

  useEffect(() => {
    const token = 
      window.location.hash && window.location.hash
        .substring(1)
        .split("&")
        .find((v) => v.startsWith("access_token"))
        .replace("access_token=", "");
    setGetauthapi(token);
  }, []);

  useEffect(() =>{
    if(getauthapi !== ''){
      setMessage('YOU ARE AUTHORIZED'); setLogin('RELOGIN')};
  }, [getauthapi]);

  useEffect(() => {
    getDataAPI();
  }, [submitinput]);

  const getDataAPI = async () => {
    const token = getauthapi;
    const search = input;
    if(token === '' || search === ''){return 0};
    const result = 
      await fetch(`https://api.spotify.com/v1/search?q=${search}&type=track&limit=12`, { 
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => response.json())
        .then(result => {
          setApidata(result.tracks.items); 
          return result;
        })
        .then(result => console.log(result.tracks.items))
  };

  const handleBtnAuth = () => {
    setSubmitgetauthapi(!submitgetauthapi);
    console.log('Getting New Auth Token API ....');
  };

  const submitInput = () => {
    setSubmitinput(!submitinput);
    getDataAPI();
    console.log(message);
    console.log('Submitted Input: ' + input);
  };

  const getInput = (v) => {
    setInput(v.target.value);
  };

  // function msecToSec(ms) {
  //   var minutes = Math.floor(ms / 60000);
  //   var seconds = ((ms % 60000) / 1000).toFixed(0);
  //   return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  // }


  // const resultData = apidata.map((v) => (
  //   <div key={v.id}>
  //     <h3>{v.name}</h3>
  //     <h4>{v.album.artists[0].name},
  //       <span id="track-sign"> {v.type}</span>
  //       <span id="duration">{msecToSec(v.duration_ms)}</span>
  //     </h4>
  //   </div>
  // ));

  return (
    <div>
      <div>{message}</div>
        <a href={AUTH_URL}><button onClick={handleBtnAuth} href={AUTH_URL}>{login}</button></a>
        <SearchBar getInput={getInput} submitInput={submitInput}/>
        <div>
          <TracksDummy apidata={apidata}/>
        </div>
        {/* <div>Hallo</div>         */}
    </div>
  )
}
