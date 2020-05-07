import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/NavigationBar';
import './App.css';
import { Home, LogIn, UserPage, Create, Register, Room } from './components/index'

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/login" component={ LogIn } />
            <Route exact path="/userpage" component={ UserPage } />
            <Route exact path="/create" component={ Create } />
            <Route exact path="/register" component={ Register } />
            <Route path="/room" component= { Room } />
          </Switch>
        </div>
      </Router>
  );
}

export default App;