import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles.css';

class FormName extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    firstName: '',
    lastName: '',
    firstNameError: '',
    lastNameError: '',
    firstNameValid: false,
    lastNameValid: false,
    formValid: false,
  }

  onSubmit = (event) => {
    const { onSubmit } = this.props;
    const { firstName, lastName } = this.state;
    event.preventDefault();

    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);

    onSubmit();
  }

  handleUserInput = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value },
      () => { this.validateField(name, value); });
  }

  validateField(name, value) {
    const fieldNameValid = /^[a-z ,.'-]+$/i.test(value);

    switch (name) {
      case 'firstName':
        this.setState({
          firstNameValid: fieldNameValid,
          firstNameError: fieldNameValid ? '' : 'First Name is not valid, please only enter letters, ".", or "-"',
        });
        break;
      case 'lastName':
        this.setState({
          lastNameValid: fieldNameValid,
          lastNameError: fieldNameValid ? '' : 'Last Name is not valid, please only enter letters, ".", or "-"',
        });
        break;
      default:
        break;
    }

    this.validateForm();
  }

  validateForm() {
    const { firstNameValid, lastNameValid } = this.state;
    const formValid = firstNameValid && lastNameValid;

    this.setState({ formValid });
  }

  render() {
    const { firstName, lastName, formValid, firstNameError, lastNameError } = this.state;

    return (
      <form id="nameForm" onSubmit={this.onSubmit}>
        <div className="nameInputs">
          <label htmlFor="firstName">
            <p>New First Name</p>
            <input
              id="firstName"
              className={firstNameError ? 'hasError' : ''}
              type="text"
              name="firstName"
              value={firstName}
              placeholder="New first name"
              onChange={this.handleUserInput}
              onBlur={this.handleUserInput}
            />
            <p className="errorText">{firstNameError}</p>
          </label>
          <label htmlFor="lastName">
            <p>New Last Name</p>
            <input
              id="lastName"
              className={lastNameError ? 'hasError' : ''}
              type="text"
              name="lastName"
              value={lastName}
              placeholder="New last name"
              onChange={this.handleUserInput}
              onBlur={this.handleUserInput}
            />
            <p className="errorText">{lastNameError}</p>
          </label>
        </div>
        <button className="submit" type="submit" disabled={!formValid}>
          Update Name
        </button>
      </form>
    );
  }
}

export default FormName;
