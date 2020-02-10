import React from 'react';
import {Link, useHistory} from 'react-router-dom';
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

export default function NavBar() {

  const history = useHistory();

  return(
    <footer className="nav">
      {history.location.pathname === '/home' ? 
        <Button disableRipple={true} style={{width:"80px",gridArea:"home"}}>
          <HomeIcon fontSize="large" style={{color:"#dfbdff"}} />
        </Button>
        :
        <Link to='/home'>
          <Button disableRipple={true} style={{width:"80px",gridArea:"home"}}>
            <HomeOutlinedIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
          </Link>
      }

      {history.location.pathname === '/search' ? 
        <Button disableRipple={true} style={{width:"80px",gridArea:"search"}}>
          <SearchIcon fontSize="large" style={{color:"#dfbdff"}} />
        </Button>
        :
        <Link to='/search'>
          <Button disableRipple={true} style={{width:"80px",gridArea:"search"}}>
            <SearchOutlinedIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
        </Link>
      }
      
      {history.location.pathname === '/add-photo' ?
        <Button disableRipple={true} style={{width:"80px",gridArea:"photo"}}>
          <AddAPhotoIcon fontSize="large" style={{color:"#dfbdff"}} />
        </Button>
        :
        <Link to='/add-photo'>
          <Button disableRipple={true} style={{width:"80px",gridArea:"photo"}}>
            <AddAPhotoOutlinedIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
        </Link>
      }
      
      {history.location.pathname === '/profile' ?
        <Button disableRipple={true} style={{width:"80px",gridArea:"profile"}}>
          <PersonIcon fontSize="large" style={{color:"#dfbdff"}} />
        </Button>
        :
        <Link to='/profile'>
          <Button disableRipple={true} style={{width:"80px",gridArea:"profile"}}>
            <PersonOutlinedIcon fontSize="large" style={{color:"#EEE"}} />
          </Button>
        </Link>
      }
    </footer>
  );
}