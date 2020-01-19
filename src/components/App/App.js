import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Home from '../Home/Home';
import './App.css';
import PostImage from '../PostImage/PostImage';
import Profile from '../Profile/Profile';
import EditThisImage from '../EditThisImage/EditThisImage';
import Following from '../Following/Following';
import OtherProfile from '../OtherProfile/OtherProfile';
import ViewThisImage from '../ViewThisImage/ViewThisImage';
import SearchBar from '../SearchBar/SearchBar';
import EditAvatar from '../EditAvatar/EditAvatar';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/add-photo"
              component={PostImage}
            />

            <ProtectedRoute
              exact
              path="/edit-avatar"
              component={EditAvatar}
            />

            <ProtectedRoute
              path="/edit-photo/:id"
              component={EditThisImage}
            />

            <ProtectedRoute
              exact
              path="/following"
              component={Following}
            />

            <ProtectedRoute
              exact
              path="/home"
              component={Home}
            />

            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
            />

            <Route
              path="/profile/:id"
              component={OtherProfile}
            />

            <Route
              exact
              path="/search"
              component={SearchBar}
            />

            <Route
              path="/view-image/:id"
              component={ViewThisImage}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App);
