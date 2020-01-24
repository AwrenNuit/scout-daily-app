// Store image comments
const commentReducer = (state=[], action) => action.type === `SET_IMAGE_COMMENT` ? action.payload : state;

export default commentReducer;