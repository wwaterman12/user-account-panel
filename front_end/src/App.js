import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

import Modal from './components/modal';

class App extends Component {
  state = {
    modalOpen: false,
    firstName: 'Wesley',
    lastName: 'Waterman',
    email: 'wwaterman12@gmail.com',
    password: 'User*667386!',
  }

  showModal = () => {
    this.setState({ modalOpen: true });
  };

  hideModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { modalOpen, firstName, lastName, email, password } = this.state;

    return (
      <div>
        <header>
          <h1>User Account</h1>
        </header>
        <main>
          <div>
            image
          </div>
          <div>
            <p>
              Full Name:
              <span>{`${firstName} ${lastName}`}</span>
            </p>
            <button type="button" onClick={this.showModal}>
              <FontAwesomeIcon icon={faUserEdit} />
              EDIT
            </button>
          </div>
          <div>
            Email:
            <span>{email}</span>
            <button type="button" onClick={this.showModal}>
              <FontAwesomeIcon icon={faUserEdit} />
              EDIT
            </button>
          </div>
          <div>
            Password:
            <span>{password.split('').map(() => ('*'))}</span>
            <button type="button" onClick={this.showModal}>
              <FontAwesomeIcon icon={faUserEdit} />
              EDIT
            </button>
          </div>
          <Modal modalOpen={modalOpen} handleClose={this.hideModal}>
            <p>
              Modal is open
            </p>
          </Modal>
        </main>
      </div>
    );
  }
}

export default App;
