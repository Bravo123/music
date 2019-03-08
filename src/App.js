import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Discover from './pages/discover/discover'
import Collection from './pages/collection/collection'
import CollectionList from './pages/collectionList/collectionList'
import Player from './pages/player/player'
import { connect } from 'react-redux'

import './App.scss';
import './style/reset.css';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/discover" component={Discover}></Route>
            <Route path="/collection/:id" component={Collection}></Route>
            <Route path="/collectionList" component={CollectionList}></Route>
            <Redirect to="/discover"></Redirect>
          </Switch>
          { this.props.showPlayer && <Player />}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  showPlayer: state.showPlayer
})

export default connect(mapStateToProps)(App)
