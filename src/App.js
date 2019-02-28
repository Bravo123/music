import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Discover from './pages/discover/discover'

import './App.scss';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/discover" component={Discover}></Route>
            <Redirect to="/discover"></Redirect>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
