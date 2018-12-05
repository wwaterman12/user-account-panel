import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

import Header from '../header';
import UserImage from '../image';
import Modal from '../modal';
import FormName from '../forms/name';
import FormEmail from '../forms/email';
import FormPassword from '../forms/password';

import './styles.css';

class App extends Component {
  state = {
    modalOpen: false,
    firstName: 'Wesley',
    lastName: 'Waterman',
    email: 'wwaterman12@gmail.com',
    password: 'changeme*66',
    form: '',
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }

  showModal = (form) => {
    this.setState({ modalOpen: true, form });
  };

  hideModal = () => {
    this.setState({ modalOpen: false });

    this.hydrateStateWithLocalStorage();
  };

  hydrateStateWithLocalStorage() {
    ['firstName', 'lastName', 'email', 'password'].forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    });
  }

  renderForm() {
    const { form } = this.state;

    switch (form) {
      case 'name': return <FormName onSubmit={this.hideModal} />;
      case 'email': return <FormEmail onSubmit={this.hideModal} />;
      case 'password': return <FormPassword onSubmit={this.hideModal} />;
      default: return null;
    }
  }

  render() {
    const { modalOpen, firstName, lastName, email, password } = this.state;

    return (
      <div>
        <Header />
        <main className="main-content">
          <UserImage email={email} firstName={firstName} lastName={lastName} />
          <div className="user-info">
            <div>
              <p className="user-info-text">
                <span>Full Name:</span>
                {`${firstName} ${lastName}`}
              </p>
              <button type="button" onClick={() => this.showModal('name')}>
                <FontAwesomeIcon icon={faUserEdit} />
                &nbsp;EDIT
              </button>
            </div>
            <div>
              <p className="user-info-text">
                <span>Email:</span>
                {email}
              </p>
              <button type="button" onClick={() => this.showModal('email')}>
                <FontAwesomeIcon icon={faUserEdit} />
                &nbsp;EDIT
              </button>
            </div>
            <div>
              <p className="user-info-text">
                <span>Password:</span>
                {password.split('').map(() => ('*'))}
              </p>
              <button type="button" onClick={() => this.showModal('password')}>
                <FontAwesomeIcon icon={faUserEdit} />
                &nbsp;EDIT
              </button>
            </div>
            <Modal modalOpen={modalOpen} handleClose={this.hideModal}>
              {this.renderForm()}
            </Modal>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
