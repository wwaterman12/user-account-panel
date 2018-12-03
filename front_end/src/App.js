import React, { Component } from 'react';

import Modal from './components/modal';

class App extends Component {
  state = {
    modalOpen: false,
  }

  showModal = () => {
    this.setState({ modalOpen: true });
  };

  hideModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { modalOpen } = this.state;

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
            name
          </div>
          <div>
            email
          </div>
          <div>
            password
          </div>
          <button type="button" onClick={this.showModal}>
            Update Account Info
          </button>
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
