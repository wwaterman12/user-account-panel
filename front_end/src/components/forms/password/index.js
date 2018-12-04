import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';

class FormPassword extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    password: '',
    passwordError: '',
    formValid: false,
  }

  onSubmit = (event) => {
    const { onSubmit } = this.props;
    const { password } = this.state;
    event.preventDefault();

    localStorage.setItem('password', password);

    onSubmit();
  }

  handleUserInput = (event) => {
    const { value } = event.target;

    this.setState({ password: value },
      () => { this.validateForm(value); });
  }

  validateForm(value) {
    const result = zxcvbn(value);
    let passwordError = '';

    switch (result.score.toString()) {
      case '0':
        passwordError = 'Password is too weak';
        break;
      case '1':
        passwordError = 'Password is a little stronger but still too weak';
        break;
      case '2':
        passwordError = 'password is ok';
        break;
      case '3':
        passwordError = 'password is strong';
        break;
      case '4':
        passwordError = 'password is very strong';
        break;
      default:
        break;
    }

    this.setState({ formValid: result.score > 1, passwordError });
  }

  render() {
    const { password, formValid, passwordError } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="password">
          password
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            placeholder="New first name"
            onChange={this.handleUserInput}
            onBlur={this.handleUserInput}
          />
          {passwordError && <p>{passwordError}</p>}
        </label>
        <button type="submit" disabled={!formValid}>
          Update Password
        </button>
      </form>
    );
  }
}

export default FormPassword;
