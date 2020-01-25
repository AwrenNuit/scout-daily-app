import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './RegisterPage.css';
import TextField from '@material-ui/core/TextField';
import LoginFooter from '../LoginFooter/LoginFooter';

const styles = ({
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderWidth: '3px',
      borderColor: `#bc75ff !important`,
    }
  },
  cssFocused: {},
  notchedOutline: {},
});

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
    const { classes } = this.props;

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
        <form className="register-form" onSubmit={this.registerUser}>
          <center>
            <img src="/images/logo.png" alt="Scout Daily Logo" height="150px"/>
            <h1 className="register-heading">Register</h1>
            <div>

              <TextField
                id="outlined-basic"
                placeholder="username"
                variant="outlined"
                name="username"
                size="small"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  }
                }}
                style={{width:"90%",marginBottom:"20px",backgroundColor:"white"}}
              />

            </div>
            <div>

              <TextField
                id="outlined-basic"
                placeholder="password"
                variant="outlined"
                name="password"
                type="password"
                size="small"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  }
                }}
                style={{width:"90%",marginBottom:"20px",backgroundColor:"white"}}
              />

            </div>
            <div>
              <Button 
                variant="contained" 
                color="primary"
                type="submit"
                value="Register"
                style={{width:"90%",marginBottom:"10px",backgroundColor:"#bc75ff"}}
              >
                Register
              </Button>
            </div>
            <hr className="register-hr" />
            <div>
              <Button 
                onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
                style={{textTransform:"lowercase",marginTop:"10px",color:"#EEE"}}
                disableRipple={true}
              >
                cancel
              </Button>
            </div>
          </center>
        </form>
        <LoginFooter />
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

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));

