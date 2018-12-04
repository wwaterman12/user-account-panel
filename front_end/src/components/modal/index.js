import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Modal = ({ handleClose, modalOpen, children }) => (
  <div className={modalOpen ? 'modal open' : 'modal closed'}>
    <section className="modal-main">
      {children}
      <button className="close-btn" type="button" onClick={handleClose}>X</button>
    </section>
  </div>
);

Modal.propTypes = {
  handleClose: PropTypes.func,
  modalOpen: PropTypes.bool,
  children: PropTypes.node,
};

export default Modal;
