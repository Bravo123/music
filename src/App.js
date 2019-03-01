import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Discover from './pages/discover/discover'
import SongList from './pages/songList/songList'

import './App.scss';
import './style/reset.css';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/discover" component={Discover}></Route>
            <Route path="/songList/:id" component={SongList}></Route>
            <Redirect to="/discover"></Redirect>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
