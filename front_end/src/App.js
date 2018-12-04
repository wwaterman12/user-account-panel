import React, { Component } from 'react';
import md5 from 'js-md5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

import Modal from './components/modal';
import FormName from './components/forms/name';
import FormEmail from './components/forms/email';
import FormPassword from './components/forms/password';

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
    const defaultImage = encodeURI('https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg');

    return (
      <div>
        <header>
          <h1>User Account</h1>
        </header>
        <main>
          <div>
            <img
              src={`https://www.gravatar.com/avatar/${md5(email).trim()}?s=200&d=${defaultImage}`}
              alt="User Profile"
            />
          </div>
          <div>
            <p>
              Full Name:
              <span>{`${firstName} ${lastName}`}</span>
            </p>
            <button type="button" onClick={() => this.showModal('name')}>
              <FontAwesomeIcon icon={faUserEdit} />
              EDIT
            </button>
          </div>
          <div>
            Email:
            <span>{email}</span>
            <button type="button" onClick={() => this.showModal('email')}>
              <FontAwesomeIcon icon={faUserEdit} />
              EDIT
            </button>
          </div>
          <div>
            Password:
            <span>{password.split('').map(() => ('*'))}</span>
            <button type="button" onClick={() => this.showModal('password')}>
              <FontAwesomeIcon icon={faUserEdit} />
              EDIT
            </button>
          </div>
          <Modal modalOpen={modalOpen} handleClose={this.hideModal}>
            {this.renderForm()}
          </Modal>
        </main>
      </div>
    );
  }
}

export default App;
