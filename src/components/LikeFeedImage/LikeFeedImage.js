import React, {Component} from 'react';
import {connect} from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class LikeFeedImage extends Component{

  state = {
    like: false
  }

  componentDidMount(){
    this.setLike();
  }

  componentDidUpdate(prevProps){
    if(this.props.image !== prevProps.image){
      if(this.props.image.liked === null || this.props.image.liked === false){
        this.setState({like: false});
      }
      else{
        this.setState({like: true});
      }
    }
  }

  // Dispatch like to saga
  handleLike = (image) => {
    if(this.state.like === false){
      this.props.dispatch({type: `ADD_LIKE`, payload: image});
    }
    else{
      this.props.dispatch({type: `SUB_LIKE`, payload: image});
    }
  }

  // Set local state T/F
  setLike = () => {
    if(this.props.image.liked === null || this.props.image.liked === false){
      this.setState({like: false});
    }
    else{
      this.setState({like: true});
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

export default connect()(LikeFeedImage);