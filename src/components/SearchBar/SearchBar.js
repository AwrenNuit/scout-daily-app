import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './SearchBar.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NavBar from '../NavBar/NavBar';

const styles = ({
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderWidth: '3px',
      borderColor: `#bc75ff !important`,
    }
  },
  cssFocused: {},
  notchedOutline: {},
});

class SearchBar extends Component{

  state = {
    search: ''
  }

  // Dispatch local state to saga
  dispatchSearch = () => {
    this.props.dispatch({type: 'SEARCH_GET', payload: this.state.search});
  }

  // Set state to input value
  handleChange = (e) => {
    this.setState({search: e.target.value});
  }

  // Dispatch user search, reset search bar
  handleClick = () => {
    this.dispatchSearch();
    this.resetState();
  }

  // Reset local state
  resetState = () => {
    this.setState({search: ''});
  }

  render(){
    const { classes } = this.props;

    return(
      <>
        <center className="search-div">
          <TextField 
            id="outlined-basic" 
            placeholder="search users" 
            variant="outlined"
            style={{marginRight:"20px"}}
            onChange={this.handleChange}
            value={this.state.search}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              }
            }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.handleClick} 
            style={{position:"relative",top:"10px",backgroundColor:"#bc75ff"}}
          >
            Search
          </Button>
        </center>

        {this.props.reduxState.length ? 
          <div className="search-main-flex">
            {this.props.reduxState.map(details=>
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
        <NavBar />
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.searchResult
});

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(putReduxStateOnProps)(SearchBar));