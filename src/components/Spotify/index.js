import React from 'react';
import {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/index.js';
import Tracks from '../Tracks/index.js';
import Album from '../Album/index.js';

const ID = '8699333de5604b2587b73f95f3c2daa7';
const REDIRECT_URI = 'http://localhost:3000';
const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${ID}&scope=playlist-modify-private%20user-read-private&redirect_uri=${REDIRECT_URI}`;

export default function SpotifySearch() {

  const [auth, setAuth] = useState('');
  const [btnauth, setBtnauth] = useState(false);
  const [search, setSearch] = useState('');
  const [btnsearch, setBtnsearch] = useState(false);
  const [authmsg, setAuthmsg] = useState('YOU ARE NOT AUTHORIZED');
  const [loginmsg, setLoginmsg] = useState('LOGIN');
  const [apidata, setApidata] = useState([]);
  const [selectedsong, setSelectedsong] = useState([]);
  const [userid, setUserid] = useState('');
  const [playlistid, setPlaylistid] = useState('');
  const [playlist, setPlaylist] = useState({
    title: '',
    description: '',
    button: false,
  });
  
  useEffect(() => {
    const token = window.location.hash && window.location.hash
        .substring(1)
        .split("&")
        .find((v) => v.startsWith("access_token"))
        .replace("access_token=", "");
    setAuth(token);
  }, []);

  useEffect(() =>{
    if(auth !== ''){
      setAuthmsg('YOU ARE AUTHORIZED'); setLoginmsg('RELOGIN')};
  }, [auth]);

  useEffect(() => {
    getSearch();
  }, [btnsearch]);

  useEffect(() => {
    createNewPlaylist();
  }, [userid]);

  useEffect(() => {
    inputToPlaylist();
  }, [playlistid])

  const getSearch = async () => {
    if(auth === '' || search === ''){return 0};
    await fetch(`https://api.spotify.com/v1/search?q=${search}&type=track&limit=12`, { 
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }).then(response => response.json())
        .then(result => setApidata(result.tracks.items))
  };

  const getUserID = async (e) => {
    if(auth === ''){return 0}
    e.preventDefault();
    await fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth}`,
        }
      }).then(response => response.json())
        .then(result => setUserid(result.id))
  };
  
  const createNewPlaylist = async () => {
    if(userid === ''){return 0}
    const newPlaylist = {
      "name": playlist.title,
      "description": playlist.description,
      "public": false,
    };
    await fetch(`https://api.spotify.com/v1/users/${userid}/playlists`, {
        method: 'POST',
        body: JSON.stringify(newPlaylist),
        headers: {
          Authorization: `Bearer ${auth}`
        },
      }).then(response => response.json())
        .then(result => setPlaylistid(result.id))
  };

  const inputToPlaylist = async () => {
    let tracks = selectedsong
      .toString()
      .replace(/:/g,"%3A")
      .replace(/,/g,"%2C"); //convert array songs, so that can be processed directly in URL
    if(playlistid === ''){return 0};
    await fetch(`https://api.spotify.com/v1/playlists/${playlistid}/tracks?uris=${tracks}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json"
      },
    }).then(response => response.json())
      .then(result => console.log(result))
      .then(() => console.log('Playlist Created'))
  }

  const handleBtnAuth = () => {
    setBtnauth(!btnauth);
    console.log('Getting New Auth Token API ....');
  };
  
  const handleBtnSearch = () => {
    setBtnsearch(!btnsearch);
    getSearch();
    console.log(authmsg);
    console.log('Submitted Input: ' + search);
  };

  const getInputSearch = (v) => {
    setSearch(v.target.value);
  };

  const getInputPlaylist = v => {
    const {name, value} = v.target;
    setPlaylist({...playlist, [name]: value});
  }

  return (
    <div>
      <Album getUserID={getUserID} getInputPlaylist={getInputPlaylist} playlist={playlist}/>
      <div>{authmsg}</div>
        <a href={AUTH_URL}><button onClick={handleBtnAuth} href={AUTH_URL}>{loginmsg}</button></a>
        <SearchBar getInputSearch={getInputSearch} handleBtnSearch={handleBtnSearch}/>
        {/* <search type="submit" onClick={seeSelected}></search> */}
        <div>
          <Tracks apidata={apidata} setSelectedsong={setSelectedsong} selectedsong={selectedsong}/>
        </div>
    </div>
  )
}
