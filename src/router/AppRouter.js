import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Home from '../components/Home';
import RedirectPage from '../components/RedirectPage';
import Dashboard from '../components/Dashboard';
import NotFoundPage from '../components/NotFoundPage';

class AppRouter extends React.Component {
  state = {
    expiryTime: '0'
  };

  componentDidMount() {
    let expiryTime;
    try {
      expiryTime = JSON.parse(localStorage.getItem('expiry_time'));
    } catch (error) {
      expiryTime = '0';
    }
    this.setState({ expiryTime });
  }

  setExpiryTime = (expiryTime) => {
    this.setState({ expiryTime });
  };

  isValidSession = () => {
    const currentTime = new Date().getTime();
    const expiryTime = this.state.expiryTime;
    const isSessionValid = currentTime < expiryTime;

    return isSessionValid;
  };

  render() {
    const state = {
      expiryTime: '0'
    };
    return (
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Home isValidSession={this.isValidSession} state={state} />
              }
            />
            <Route
              path="/redirect"
              element={(props) => (
                <RedirectPage
                  isValidSession={this.isValidSession}
                  setExpiryTime={this.setExpiryTime}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard"
              element={(props) => (
                <Dashboard isValidSession={this.isValidSession} {...props} />
              )}
            />
            <Route element={NotFoundPage} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
