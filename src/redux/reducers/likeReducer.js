// Store likes
const likeReducer = (state=[], action) => action.type === `SET_LIKE` ? action.payload : state;

export default likeReducer;