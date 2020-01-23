import React, {Component} from 'react';
import {connect} from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class LikeFeedImage extends Component{

  state = {
    like: false
  }

  componentDidMount(){
    this.setState({like: this.props.image.liked})
  }

  componentDidUpdate(prevProps){
    console.log('-------------------------------------------', prevProps.image);
    if(this.props.image !== prevProps.image){
      if(this.props.image.liked !== true){
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
      this.props.dispatch({type: `SUB_FEED_LIKE`, payload: image});
    }
  }

  render(){
    return(
      <>
      {JSON.stringify(this.state.like)}
      {JSON.stringify(this.props.image.liked)}
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