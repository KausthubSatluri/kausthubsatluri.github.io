import React from 'react';
import './Maintenance.css';

function Maintenance() {
  return (
    <div className="maintenance">
      <div className="maintenance__card fade-in">
        <div className="maintenance__icon" aria-hidden="true">🛠️</div>
        <h1 className="maintenance__title">Under Repair</h1>
        <p className="maintenance__text">
          I'm currently rebuilding this site. Some things are still in pieces on
          the floor — please check back soon.
        </p>
        <div className="maintenance__bar" aria-hidden="true">
          <span className="maintenance__bar-fill" />
        </div>
        <p className="maintenance__sign">— Kausthub</p>
      </div>
    </div>
  );
}

export default Maintenance;
