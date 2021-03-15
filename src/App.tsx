import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';

const App: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact>
            { isLoggedIn ? (
              <Home />
            ) : (
              <Login />
            ) }
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
