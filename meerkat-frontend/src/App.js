import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Home from './components/pages/Home';
// import LogIn from './components/pages/LogIn';
// import UserPage from './components/pages/UserPage';
// import Create from './components/pages/Create';
// import Register from './components/pages/Register';
import Navbar from './components/NavigationBar';
import './App.css';
import { Home, LogIn, UserPage, Create, Register } from './components/index'

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
          </Switch>
        </div>
      </Router>
  );
}

export default App;
