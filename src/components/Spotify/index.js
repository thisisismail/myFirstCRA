/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/index.js';
import Tracks from '../Tracks/index.js';
import Album from '../Album/index.js';
import {connect} from 'react-redux';

const SpotifySearch = (props) => {

  const [search, setSearch] = useState('');
  const [btnsearch, setBtnsearch] = useState(false);
  const [authmsg, setAuthmsg] = useState('YOU ARE NOT AUTHORIZED');
  const [apidata, setApidata] = useState([]);
  const [selectedsong, setSelectedsong] = useState([]);
  const [userid, setUserid] = useState('');
  const [playlistid, setPlaylistid] = useState('');
  const [playlist, setPlaylist] = useState({
    title: '',
    description: '',
    button: false,
  });

  useEffect(() =>{
    if(props.tokenFromRedux !== ''){setAuthmsg('YOU ARE AUTHORIZED')};
  }, [props.tokenFromRedux]);

  useEffect(() => {
    getSearch();
  }, [btnsearch]);

  useEffect(() => {
    createNewPlaylist();
  }, [userid]);

  useEffect(() => {
    inputToPlaylist();
  }, [playlistid]);

  const getSearch = async () => {
    if(props.tokenFromRedux === '' || search === ''){return 0};
    await fetch(`https://api.spotify.com/v1/search?q=${search}&type=track&limit=12`, { 
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.tokenFromRedux}`,
        },
      }).then(response => response.json())
        .then(result => setApidata(result.tracks.items))
  };

  const getUserID = async (e) => {
    if(props.tokenFromRedux === ''){return 0}
    e.preventDefault();
    await fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${props.tokenFromRedux}`,
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
          Authorization: `Bearer ${props.tokenFromRedux}`
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
        Authorization: `Bearer ${props.tokenFromRedux}`,
        "Content-Type": "application/json"
      },
    }).then(response => response.json())
      .then(result => console.log(result))
      .then(() => console.log('Playlist Created'))
  }
  
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
        <SearchBar getInputSearch={getInputSearch} handleBtnSearch={handleBtnSearch}/>
        <div>
          <Tracks apidata={apidata} setSelectedsong={setSelectedsong} selectedsong={selectedsong}/>
        </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    tokenFromRedux: state.storeToken,
  }
}

export default connect(mapStateToProps)(SpotifySearch);
