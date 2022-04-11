import React from 'react';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import tokenActions from '../../Redux/Token/actions/index.js'

const ID = '8699333de5604b2587b73f95f3c2daa7';
const REDIRECT_URI = 'http://localhost:3000';
const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${ID}&scope=playlist-modify-private%20user-read-private&redirect_uri=${REDIRECT_URI}`;

const LoginPage = (props) => {

  const [btn, setBtn] = useState(false);

  useEffect(() => {
    const token = window.location.hash && window.location.hash
        .substring(1)
        .split("&")
        .find((v) => v.startsWith("access_token"))
        .replace("access_token=", "");
    props.store(token);
  });

  const btnGetToken = (e) => {
    setBtn(!btn);
  }

  return (
    <div>
        <a href={AUTH_URL}><button onClick={btnGetToken}>LOGIN</button></a>
    </div>
  )
}

const mapStateToProps = state => { // call global state
  return{
    tokenFromRedux: state.storeToken,
  }
}

const mapDispatchToProps = dispatch => { // change global state
  return{
    store: (v) => dispatch(tokenActions(v)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);