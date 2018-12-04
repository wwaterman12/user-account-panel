import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';

import '../styles.css';

class FormPassword extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    password: '',
    passwordError: '',
    formValid: false,
    isChecked: false,
  }

  onSubmit = (event) => {
    const { onSubmit } = this.props;
    const { password } = this.state;
    event.preventDefault();

    localStorage.setItem('password', password);

    onSubmit();
  }

  handleUserCheck = () => {
    const { isChecked } = this.state;

    this.setState({ isChecked: !isChecked });
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
        passwordError = 'Password is very weak';
        break;
      case '1':
        passwordError = 'Password is weak';
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
    const { password, formValid, passwordError, isChecked } = this.state;

    return (
      <form id="passwordForm" onSubmit={this.onSubmit}>
        <label htmlFor="password">
          <p>New Password</p>
          <input
            id="password"
            className={passwordError && !formValid ? 'hasError' : ''}
            type={isChecked ? 'text' : 'password'}
            name="password"
            value={password}
            placeholder="Enter new password"
            onChange={this.handleUserInput}
            onBlur={this.handleUserInput}
          />
          <p className={formValid ? 'validText' : 'errorText'}>{passwordError}</p>
        </label>
        <input
          type="checkbox"
          value={isChecked}
          onChange={this.handleUserCheck}
        />
        <span className="showPassword">Show Password</span>
        <button className="submit" type="submit" disabled={!formValid}>
          Update Password
        </button>
      </form>
    );
  }
}

export default FormPassword;
