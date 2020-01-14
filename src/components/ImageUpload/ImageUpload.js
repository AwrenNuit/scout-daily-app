import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

const dropzoneStyle = {
    border: '1px solid black',
    height: '50px',
    width: '200px',
    cursor: 'pointer'
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
        <p>Post Image</p>
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