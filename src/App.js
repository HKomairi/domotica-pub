import React from 'react';
import './App.css';
import Header from './components/MenuBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Floor from './components/Floor';
import RoomSettings from './components/RoomSettings';
import AddControl from './components/AddControl';
import ControlList from './components/ControlList';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Floor />
            </Route>
            <Route exact path="/floor/:nr">
              <Floor />
            </Route>
            <Route exact path="/room/:nr">
              <RoomSettings />
            </Route>
            <Route exact path={`/room/:nr/add`}>
              <AddControl />                            
            </Route>
            <Route exact path={`/room/:nr`}>
              <ControlList />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;