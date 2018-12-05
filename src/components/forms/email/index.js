import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles.css';

class FormEmail extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    email: '',
    emailError: '',
    formValid: false,
  }

  onSubmit = (event) => {
    const { onSubmit } = this.props;
    const { email } = this.state;
    event.preventDefault();

    localStorage.setItem('email', email);

    onSubmit();
  }

  handleUserInput = (event) => {
    const { value } = event.target;

    this.setState({ email: value },
      () => { this.validateForm(value); });
  }

  validateForm(value) {
    const formValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);

    this.setState({
      formValid,
      emailError: formValid ? '' : 'Email is not valid, please enter a valid email address.',
    });
  }

  render() {
    const { email, formValid, emailError } = this.state;

    return (
      <form id="emailForm" onSubmit={this.onSubmit}>
        <label htmlFor="email">
          <p>New Email</p>
          <input
            id="email"
            className={emailError ? 'hasError' : ''}
            type="email"
            name="email"
            value={email}
            placeholder="New email address"
            onChange={this.handleUserInput}
            onBlur={this.handleUserInput}
          />
          <p className="errorText">{emailError}</p>
        </label>
        <button className="submit" type="submit" disabled={!formValid}>
          Update Email
        </button>
      </form>
    );
  }
}

export default FormEmail;
