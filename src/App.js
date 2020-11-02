import { Domain } from '@material-ui/icons';
import React from 'react';
import './App.css';
import Header from './components/header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Floor from './components/floor';
import RoomSettings from './components/room-settings';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        
        <Router>
          <Header />
          <Switch>
            <Route exact path="/floor/:nr">
              <Floor />
            </Route>
            <Route exact path="/room/:nr">
              <RoomSettings />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;