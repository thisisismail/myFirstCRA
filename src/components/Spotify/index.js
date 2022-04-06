import React from 'react';
import {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/index.js';
import Tracks from '../Tracks/index.js';
import Album from '../Album/index.js';

const ID = '8699333de5604b2587b73f95f3c2daa7';
const REDIRECT_URI = 'http://localhost:3000';
const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${ID}&scope=playlist-modify-private%20user-read-private&redirect_uri=${REDIRECT_URI}`;

export default function SpotifySearch() {

  const [getauthapi, setGetauthapi] = useState('');
  const [submitgetauthapi, setSubmitgetauthapi] = useState(false);
  const [input, setInput] = useState('');
  const [submitinput, setSubmitinput] = useState(false);
  const [message, setMessage] = useState('YOU ARE NOT AUTHORIZED');
  const [login, setLogin] = useState('LOGIN');
  const [apidata, setApidata] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [selectsong, setSelectsong] = useState([]);
  const [userid, setUserid] = useState('');
  
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

  useEffect(() => {
    makePlaylist();
  }, [userid]);

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

  const getUserID = async (e) => {
    if(getauthapi === ''){return 0}
    e.preventDefault();
    const result = 
      await fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getauthapi}`,
        }
      }).then(response => response.json())
        .then(result => {console.log(result.id);console.log(selectsong); setUserid(result.id)})
  };
  
  const makePlaylist = async (e) => {
    if(userid === ''){return 0}
    const newPlaylist = {
      "name": "Testing",
      "description": "New playlist description",
      "public": false
    };
    console.log(selectsong)
    const result = 
      await fetch(`https://api.spotify.com/v1/users/${userid}/playlists`, {
        method: 'POST',
        body: JSON.stringify(newPlaylist),
        headers: {
          Authorization: `Bearer ${getauthapi}`
        }
      })
        .then(response => response.json())
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

  return (
    <div>
      <Album getUserID={getUserID}/>
      <div>{message}</div>
        <a href={AUTH_URL}><button onClick={handleBtnAuth} href={AUTH_URL}>{login}</button></a>
        <SearchBar getInput={getInput} submitInput={submitInput}/>
        {/* <input type="submit" onClick={seeSelected}></input> */}
        <div>
          <Tracks apidata={apidata} setSelectsong={setSelectsong} selectsong={selectsong}/>
        </div>
    </div>
  )
}
