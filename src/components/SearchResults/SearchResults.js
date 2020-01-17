import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

function SearchResults(){

  let dispatch = useDispatch();
  let results = useSelector((state)=>state.results);

  function results(){
    dispatch({type: 'INCREMENT'});
  }

  return(
    <>
      {this.props.reduxState ? 
        this.props.reduxState.map(details=>
            <div className="search-result-container" key={details.id}>
              <Link to={"/profile/"+details.id}>
                <img className="search-avatar" src={details.details_url} alt={details.caption} />
              </Link>
              <div>{details.username}</div>
            </div>
        ) 
        : 
        <p>No results</p>
      }
    </>
  )
}

export default SearchResults;