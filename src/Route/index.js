import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import SpotifySearch from '../components/Spotify/index.js';
import LoginPage from '../components/LoginPage/index.js'
import {connect} from 'react-redux';
import tokenActions from '../Redux/Token/actions/index.js'
import {BrowserRouter} from 'react-router-dom'



const PageRouter = (props) => {
  return (
    <BrowserRouter>
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginPage/>
        </Route>
        <Route path="/private">
          {/* <Link to="/">Login</Link><br></br><br></br> */}
          {
            (props.tokenFromRedux !== '') 
            ? ( <SpotifySearch/> ) 
            : ( <Redirect to="/"/> )
          }
        </Route>
      </Switch>
    </Router>
    </BrowserRouter>
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
