import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import EditAvatar from '../EditAvatar/EditAvatar';
import EditThisImage from '../EditThisImage/EditThisImage';
import Following from '../Following/Following';
import Home from '../Home/Home';
import OtherProfile from '../OtherProfile/OtherProfile';
import PostImage from '../PostImage/PostImage';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SearchBar from '../SearchBar/SearchBar';
import ViewThisImage from '../ViewThisImage/ViewThisImage';

export default function App() {

  const dispatch = useCallback(useDispatch());

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `FETCH_USER`});
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <ProtectedRoute exact path="/add-photo" component={PostImage} />
          <ProtectedRoute exact path="/edit-avatar" component={EditAvatar} />
          <ProtectedRoute path="/edit-photo/:id" component={EditThisImage} />
          <ProtectedRoute exact path="/following" component={Following} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route path="/profile/:id" component={OtherProfile} />
          <Route exact path="/search" component={SearchBar} />
          <Route path="/view-image/:id" component={ViewThisImage} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </Router>
  );
}