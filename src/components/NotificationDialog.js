// NotificationDialog.js
'use client'

import React from 'react';

const NotificationDialog = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className="notification-overlay">
      <div className={`notification-dialog notification-${type}`}>
        <div className="notification-header">
          <button className="btn-close" onClick={onClose}>X</button>
        </div>
        <div className="notification-body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationDialog;
