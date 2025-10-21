import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const Spinner = () => (
  <div className="app-spinner-overlay">
    <div className="app-spinner-container">
      <FontAwesomeIcon icon={faSpinner} spin size="4x" className="fa-spinner"/>
    </div>
  </div>
);

export default Spinner;