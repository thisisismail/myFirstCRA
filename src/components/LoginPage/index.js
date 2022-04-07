import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link, useParams } from 'react-router-dom'
import SpotifySearch from '../Spotify/index.js'

function LoginPage() {
  let login = false;
  const btnLogin = () => {
    login = true;
    console.log(login);
  }
  return (
    <Router>
      <Switch>
        <Route path="/private">
          {
            login ? (
              <SpotifySearch/>
            ) : (
              <Redirect to="/public"/> )
          }
        </Route>
        <Route path="/public">
          <Link to="/private">
            <button onClick={btnLogin}>LOGIN</button>
          </Link>
        </Route>
      </Switch>
    </Router>
  )
}

export default LoginPage;
