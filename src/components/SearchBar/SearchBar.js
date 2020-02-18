import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import './SearchBar.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NavBar from '../NavBar/NavBar';

export default function SearchBar() {

  const dispatch = useCallback(useDispatch());
  const history = useHistory();
  const result = useSelector(state => state.searchResult);
  const [search, setSearch] = useState('');
  const letters = /^[A-Za-z]+$/;

  // Clear reducer
  useEffect(()=>{
    return () => dispatch({type: `CLEAR_SEARCH`});
  }, []);

  // Dispatch user's search to saga
  const dispatchSearch = () => dispatch({type: 'SEARCH_GET', payload: search});

  // Set state to input value
  const handleChange = e => e.target.value.match(letters) ? setSearch(e.target.value) : '';

  // Dispatch user search, reset search bar
  const handleClick = () => {
    dispatchSearch();
    resetState();
  }

  // Reset search
  const resetState = () => setSearch('');

  return(
    <>
      <center className="search-div">
        <TextField 
          id="outlined-basic" 
          placeholder="search users" 
          variant="outlined"
          style={{marginRight:"20px",width:"60%",marginTop:"30px"}}
          onChange={handleChange}
          value={search}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleClick} 
          style={{position:"relative",top:"40px",backgroundColor:"#bc75ff"}}
        >
          Search
        </Button>
      </center>

      {result.length ? 
        <div className="search-main-flex">
          {result.map(details=>
              <div className="search-col" key={details.id}>
                <Link to={"/profile/"+details.id}>
                  <img className="search-avatar" src={details.avatar} alt={details.username} />
                </Link>
                <div>{details.username}</div>
              </div>
          )}
        </div> 
        : 
        <p className="no-results">No results</p>
      }
      <div className="bottom-whitespace"></div>
      <NavBar history={history.location.pathname} />
    </>
  );
}