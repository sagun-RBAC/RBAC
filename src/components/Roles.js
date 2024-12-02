'use client'



import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, updateDoc, doc } from '@/app/firebase'; // Adjust the import based on your file structure
import { deleteDoc } from 'firebase/firestore';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [features, setFeatures] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [updateRoleName, setUpdateRoleName] = useState('');
  const [editingRoleId, setEditingRoleId] = useState(null);

  const rolesCollectionRef = collection(db, 'user_roles'); // Firestore collection


    // Fetch users from Firestore when the component mounts
    useEffect(() => {
        const fetchFeatures = async () => {
          try {
            const featuresCollection = collection(db, 'features'); // Reference to 'users' collection in Firestore
            const snapshot = await getDocs(featuresCollection); // Fetch documents
            const featureList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map Firestore data to an array
            setFeatures(featureList[0].features); // Update state with fetched users
          } catch (error) {
            console.error("Error fetching features: ", error);
          }
        };
    
        fetchFeatures(); // Call the fetch function when component mounts
      }, []);  // Empty dependency array ensures it only runs once when the component mounts

  // Fetch roles from Firestore
  const fetchRoles = async () => {
    try {
      const data = await getDocs(rolesCollectionRef);
      setRoles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  // Add new role to Firestore
  const addRole = async () => {
    if (roleName.trim() === "") return; // Prevent empty roles

    try {
      await addDoc(rolesCollectionRef, {
        name: roleName
      });
      setRoleName('');
      fetchRoles(); // Refresh the roles list
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  // Update role in Firestore
  const updateRole = async () => {
    if (updateRoleName.trim() === "") return;

    try {
      const roleDocRef = doc(db, 'user_roles', editingRoleId);
      await updateDoc(roleDocRef, { name: updateRoleName });
      setEditingRoleId(null);
      setUpdateRoleName('');
      fetchRoles(); // Refresh the roles list
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  // Delete role from Firestore
  const deleteRole = async (id) => {
    try {
      const roleDocRef = doc(db, 'user_roles', id);
      await deleteDoc(roleDocRef);
      fetchRoles(); // Refresh the roles list
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  useEffect(() => {
    fetchRoles(); // Fetch roles when component mounts
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Roles</h2>

      {/* Add Role */}
      {features?.map(ftr => <p key={ftr}>{ftr}</p>)}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Enter new role"
        />
        <button className="btn btn-primary mt-2" onClick={addRole}>Add Role</button>
      </div>

      {/* Update Role */}
      {editingRoleId && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={updateRoleName}
            onChange={(e) => setUpdateRoleName(e.target.value)}
            placeholder="Update role"
          />
          <button className="btn btn-warning mt-2" onClick={updateRole}>Update Role</button>
        </div>
      )}

      {/* List of roles */}
      <ul className="list-group">
        {roles.map((role) => (
          <li key={role.id} className="list-group-item d-flex justify-content-between align-items-center">
            {role.name}
            <div>
              <button
                className="btn btn-info btn-sm me-2"
                onClick={() => {
                  setEditingRoleId(role.id);
                  setUpdateRoleName(role.name);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteRole(role.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roles;
