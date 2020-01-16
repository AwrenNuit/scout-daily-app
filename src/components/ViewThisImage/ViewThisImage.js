import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ViewThisImage.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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

  render(){
    return(
      <>
        <center>
          <div>

                {/* <div 
                  className="img" 
                  style={{backgroundImage:`url(https://scout-daily.s3.us-east-2.amazonaws.com/${image.image_url})`,width:"90%",marginBottom:"20px",borderRadius:"20px"}}>
                </div> */}
            <div>
            <img className="img" src={this.props.reduxState.image_url} alt={this.props.reduxState.description} />
            </div>
          </div>
          <div>{this.state.caption}</div>
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