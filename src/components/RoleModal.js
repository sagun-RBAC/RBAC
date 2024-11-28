import React, { useState } from 'react';

// Modal component to select role
const RoleModal = ({ showModal, setShowModal, selectedUser, setUsers, users }) => {
  const availableRoles = ['Admin', 'Editor', 'Viewer'];

  const handleRoleChange = (role) => {
    const updatedUsers = [...users];
    const userIndex = updatedUsers.findIndex(user => user.email === selectedUser.email);
    if (userIndex !== -1) {
      updatedUsers[userIndex].role = role;  // Update the role of the selected user
    }
    setUsers(updatedUsers); // Update users list with new role
    setShowModal(false); // Close the modal
  };

  return (
    showModal && (
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Role</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul>
                {availableRoles.map((role, index) => (
                  <li key={index}>
                    <button
                      className="btn btn-link"
                      onClick={() => handleRoleChange(role)}
                    >
                      {role}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RoleModal;