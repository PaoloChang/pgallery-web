import { useReactiveVar } from '@apollo/client';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkModeVar, isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import { darkTheme, lightTheme, GlobalStyles } from './styles';

const App: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <div>
      <ThemeProvider theme={ darkMode ? darkTheme : lightTheme }>
        <GlobalStyles />
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
      </ThemeProvider>
    </div>
  );
}

export default App;
