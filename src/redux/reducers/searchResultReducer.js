const searchResultReducer = (state=[], action) => {
  if(action.type === `SET_RESULTS`){
    return action.payload;
  }
  else if(action.type === `CLEAR_SEARCH`){
    return [];
  }
  return state;
}

export default searchResultReducer;