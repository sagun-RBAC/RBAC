
'use client'

import { useState } from "react";
import RoleModal from "./RoleModal";

const Users = () =>{
    // Example users array with initial roles
    const [users, setUsers] = useState([
      { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
      { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor' },
      { name: 'Sam Wilson', email: 'sam.wilson@example.com', role: 'Viewer' },
      { name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Editor' },
    ]);
  
    const [showModal, setShowModal] = useState(false); // State to handle modal visibility
    const [selectedUser, setSelectedUser] = useState(null); // State to track selected user for role change

  

    const handleRoleClick = (user) => {
      setSelectedUser(user);
      setShowModal(true); // Show the modal when button is clicked
    };
  
    return (
      <div className="container mt-5">
        <h2 className="mb-4 text-info">Registered Users</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Traverse the users array and render each row dynamically */}
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRoleClick(user)}
                  >
                    Add Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Role Selection Modal */}
        <RoleModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedUser={selectedUser}
          setUsers={setUsers}
          users={users}
        />
      </div>
    );
  };

export default Users;