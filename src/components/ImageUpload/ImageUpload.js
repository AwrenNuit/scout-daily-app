import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

const dropzoneStyle = {
    backgroundColor: '#3f51b5',
    color: 'white',
    fontSize: '14.5px',
    fontFamily: 'Roboto, sans-serif',
    height: '37px',
    width: '90%',
    borderRadius: '4px',
    boxShadow: '0 1px 2px grey',
    cursor: 'pointer',
    marginBottom: '10px',
}

class ImageUpload extends Component{

  // Dispatch uploaded file to database
  handleFinishedUpload = info => {
    this.props.dispatch({type: `POST_IMAGE`, payload: {image_url: info.filename, caption: this.props.caption}});
    this.props.history.push('/home');
  }

  render(){
    // For Dropzone
    const uploadOptions = {
      server: 'http://localhost:5000'
    }

    // For Dropzone
    const s3Url = 'https://scout-daily.s3.amazonaws.com';

    // For text on Dropzone button
    const innerEl = (
      <div className='zone'>
        <p style={{position:"relative",top:'13px'}}>POST IMAGE</p>
      </div>
    )

    return (
      <DropzoneS3Uploader
        onFinish={this.handleFinishedUpload}
        style={dropzoneStyle}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
        children={innerEl} // why does this give warnings? When commented out the warnings disappear
      />
    )
  }
}

export default connect()(ImageUpload);