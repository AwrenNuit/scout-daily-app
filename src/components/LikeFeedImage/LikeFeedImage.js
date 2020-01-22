import React, {Component} from 'react';
import {connect} from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class LikeFeedImage extends Component{

  state = {
    like: false
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_LIKE`, payload: this.props.image.id});
    console.log('IN DID MOUNT----------------------------');
  }

  componentDidUpdate(prevProps){
    if(this.props.reduxState !== prevProps.reduxState){
      console.log('in DID UPDATE-------------------------');
      if(this.props.reduxState.liked !== true){
        this.setState({
          like: false,
        });
      }
      else{
        this.setState({
          like: true,
        });
      }
    }
  }

  // Dispatch like to saga
  handleLike = (image) => {
    if(this.state.like === false){
      this.props.dispatch({type: `ADD_FEED_LIKE`, payload: image});
    }
    else{
      this.props.dispatch({type: `SUB_LIKE`, payload: image});
    }
  }

  render(){
    return(
      <>
        {this.state.like ?
          <FavoriteIcon 
            onClick={()=>this.handleLike(this.props.image.id)} 
            style={{marginLeft:"40px",cursor:"pointer",color:"#b50000"}}
          />
          :
          <FavoriteBorderIcon 
            onClick={()=>this.handleLike(this.props.image.id)} 
            style={{marginLeft:"40px",cursor:"pointer"}}
          />
        }
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.like
});

export default connect(putReduxStateOnProps)(LikeFeedImage);