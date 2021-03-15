import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './screens/Home';
import Home from './screens/Login';
import NotFound from './screens/NotFound';

const App: React.FC = () => {
  const isLoggedIn = true;
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact>
            { isLoggedIn ? <Home/> : <Login/> }
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
