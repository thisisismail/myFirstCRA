import React from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import SpotifySearch from '../components/Spotify/index.js';
import LoginPage from '../components/LoginPage/index.js'
import {connect} from 'react-redux';
import tokenActions from '../Redux/Token/actions/index.js'

const PageRouter = (props) => {
  let exact = true;  
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Link to="/private">Dashboard</Link><br></br>
          <LoginPage/>
        </Route>
        <Route path="/private">
          <Link to="/">Login</Link>
          {
            (props.tokenFromRedux !== '') 
            ? ( <SpotifySearch/> ) 
            : ( <Redirect to="/"/> )
          }
          {/* <h4>{props.tokenFromRedux}</h4> */}
        </Route>
      </Switch>
    </Router>
  )
}

const mapStateToProps = state => {
  return{
    tokenFromRedux: state.storeToken,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    storeToken: (v) => dispatch(tokenActions(v)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageRouter);
