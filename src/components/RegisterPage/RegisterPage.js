import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class RegisterPage extends Component {

  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register</h1>
          <div>
            <center>

              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                name="username"
                size="small"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                style={{width:"90%",marginBottom:"20px",backgroundColor:"white"}}
              />

            </center>
          </div>
          <div>
            <center>

              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                name="password"
                type="password"
                size="small"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                style={{width:"90%",marginBottom:"20px",backgroundColor:"white"}}
              />

            </center>
          </div>
          <div>
            <center>
              <Button 
                variant="contained" 
                color="primary"
                type="submit"
                value="Register"
                style={{width:"90%",marginBottom:"10px"}}
              >
                Register
              </Button>
            </center>
          </div>
          <hr />
          <div>
            <center>
            <Button 
              onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
              style={{textTransform:"lowercase",marginTop:"10px"}}
            >
              cancel
            </Button>
            </center>
          </div>
        </form>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

