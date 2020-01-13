import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './NavBar.css';

import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import Button from '@material-ui/core/Button';

class NavBar extends Component{
  render(){
    return(
      <footer className="nav">
        {this.props.history === '/home' ? 
          <Button disableRipple="true" style={{width:"80px",gridArea:"home"}}>
            <HomeIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
          :
          <Button disableRipple="true" style={{width:"80px",gridArea:"home"}}>
            <HomeOutlinedIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
        }

        {this.props.history === '/search' ? 
          <Button disableRipple="true" style={{width:"80px",gridArea:"search"}}>
            <SearchIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
          :
          <Button disableRipple="true" style={{width:"80px",gridArea:"search"}}>
            <SearchOutlinedIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
        }
        
        {this.props.history === '/addphoto' ?
          <Button disableRipple="true" style={{width:"80px",gridArea:"photo"}}>
            <AddAPhotoIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
          :
          <Button disableRipple="true" style={{width:"80px",gridArea:"photo"}}>
            <AddAPhotoOutlinedIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
        }
        
        {this.props.history === '/profile' ?
          <Button disableRipple="true" style={{width:"80px",gridArea:"profile"}}>
            <PersonIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
          :
          <Button disableRipple="true" style={{width:"80px",gridArea:"profile"}}>
            <PersonOutlinedIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
        }
        
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
