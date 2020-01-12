import React, {Component} from 'react';
import {connect} from 'react-redux';
import './NavBar.css';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Button from '@material-ui/core/Button';


class NavBar extends Component{
  render(){
    return(
      <footer className="nav">
        <Button disableRipple="true" style={{margin:"0 2px"}}>
          <HomeIcon fontSize="large" style={{color:"#EEE"}} />
        </Button>
        <Button disableRipple="true" style={{margin:"0 2px"}}>
          <SearchIcon fontSize="large" style={{color:"#EEE"}} />
        </Button>
        <Button disableRipple="true" style={{margin:"0 2px"}}>
          <AddAPhotoIcon fontSize="large" style={{color:"#EEE"}} />
        </Button>
        <Button disableRipple="true" style={{margin:"0 2px"}}>
          <PersonIcon fontSize="large" style={{color:"#EEE"}} />
        </Button>
        <Button disableRipple="true" style={{margin:"0 2px"}}>
          <PeopleAltIcon fontSize="large" style={{color:"#EEE"}} />
        </Button>
      </footer>
    );
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps)(NavBar);