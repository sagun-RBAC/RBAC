

'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, addRole } from './roleActions'; 

const RoleManagement = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.roles); 

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleAddRole = () => {
    const newRole = { name: 'New Role' }; 
    dispatch(addRole(newRole)); 
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4 text-info">Role Management</h2>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <button 
                  className="btn btn-primary"
                  onClick={handleAddRole}
                >
                  Add Role
                </button>
              </div>
              <ul className="list-group">
                {roles.length === 0 ? (
                  <li className="list-group-item text-center">No roles available</li>
                ) : (
                  roles.map((role) => (
                    <li key={role.id} className="list-group-item d-flex justify-content-between align-items-center text-info-emphasis">
                      {role.name}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;

