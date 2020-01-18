import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

class LoginPage extends Component {

  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form className="login-form" onSubmit={this.login}>
          <center>
            <img src="/images/logo.png" alt="Scout Daily Logo" height="150px"/>
            <h1>Login</h1>
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
                value="Log In"
                style={{width:"90%",marginBottom:"10px",backgroundColor:"#bc75ff"}}
              >
                Log in
              </Button>
            </div>
            <hr />
            <div>
              <Button 
                onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
                style={{textTransform:"lowercase",marginTop:"10px",color:"#EEE"}}
                disableRipple={true}
              >
                register
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
