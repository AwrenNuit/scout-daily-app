import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ViewThisImage.css';
import NavBar from '../NavBar/NavBar';

class ViewThisImage extends Component{

  state = {
    caption: '',
    id: ''
  }

  componentDidMount(){
    this.props.dispatch({type: `VIEW_THIS_IMAGE`, payload: this.props.match.params.id});
  }

  componentDidUpdate(prevProps){
    if(this.props.reduxState !== prevProps.reduxState){
      this.setState({
        caption: this.props.reduxState.caption,
        id: this.props.reduxState.id
      });
    }
  }

  handleLike = (id) => {
    this.props.dispatch({type: `ADD_LIKE`, payload: id});
  }

  render(){
    return(
      <>
        <center>
          <div>
            <div>
              <img className="img" src={this.props.reduxState.image_url} alt={this.props.reduxState.description} />
            </div>
            <div>{this.state.caption}</div>
            <div onClick={()=>this.handleLike(this.props.reduxState.id)}>Like</div>
          </div>
          <div>COMMENTS GO HERE</div>
        </center>
        <NavBar />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.viewThisImage
});

export default connect(putReduxStateOnProps)(ViewThisImage);