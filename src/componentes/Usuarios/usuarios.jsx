import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser, updateUserAdmin } from '../../redux/Action/action';
import './usuarios.css';

const UsersComponent = ({ users, fetchUsers, updateUserAdmin, deleteUser }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const [editableUser, setEditableUser] = useState(null);
  const [editableUserValues, setEditableUserValues] = useState({});
  const roles = ["admin", "buyer"];

  const handleEdit = (userId) => {
    setEditableUser(userId);
    setEditableUserValues((prevValues) => ({
      ...prevValues,
      [userId]: { ...users.find((user) => user.id === userId) },
    }));
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
      setEditableUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (userId, field, value) => {
    setEditableUserValues((prevValues) => ({
      ...prevValues,
      [userId]: {
        ...prevValues[userId],
        [field]: value,
      },
    }));
  };

  const handleSave = async (userId) => {
    try {
      const userData = editableUserValues[userId];
      await updateUserAdmin(userId, userData);
      fetchUsers();
      setEditableUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    setEditableUser(null);
    setEditableUserValues({});
  };

  return (
    <div style={{
        border: "1px solid black",
        marginTop: "100px",
        height: "720px",
        width: "auto",
        marginLeft: "230px",
        borderRadius: "10px",
        backgroundColor: "#ffffff9f", 
        boxShadow: "0 0 9px rgba(0, 0, 0, 0.7)", 
        marginBottom: "50px"
      }}>
    <div className="user-table-container">
      <h2 className='titulo'>Tabla de usuarios</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ROL</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Password</th>
              <th>Country</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                
                <td>
                  {editableUser === user.id ? (
                    <select
                      value={editableUserValues[user.id]?.rol || user.rol}
                      onChange={(e) => handleInputChange(user.id, 'rol', e.target.value)}
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.rol
                  )}
                </td>


                <td>
                  {editableUser === user.id ? (
                    <input style={{width:"150px"}}
                      type="text"
                      value={editableUserValues[user.id]?.name || ''}
                      onChange={(e) => handleInputChange(user.id, 'name', e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <input style={{width:"150px"}}
                      type="text"
                      value={editableUserValues[user.id]?.surName || ''}
                      onChange={(e) => handleInputChange(user.id, 'surName', e.target.value)}
                    />
                  ) : (
                    user.surName
                  )}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <input style={{width:"150px"}}
                      type="text"
                      value={editableUserValues[user.id]?.email || ''}
                      onChange={(e) => handleInputChange(user.id, 'email', e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <input style={{width:"150px"}}
                      type="text"
                      value={editableUserValues[user.id]?.password || ''}
                      onChange={(e) => handleInputChange(user.id, 'password', e.target.value)}
                    />
                  ) : (
                    user.password
                  )}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <input style={{width:"150px"}}
                      type="text"
                      value={editableUserValues[user.id]?.country || ''}
                      onChange={(e) => handleInputChange(user.id, 'country', e.target.value)}
                    />
                  ) : (
                    user.country
                  )}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <input style={{width:"150px"}}
                      type="text"
                      value={editableUserValues[user.id]?.phone || ''}
                      onChange={(e) => handleInputChange(user.id, 'phone', e.target.value)}
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <input style={{width:"150px"}}
                      type="text"
                      value={editableUserValues[user.id]?.address || ''}
                      onChange={(e) => handleInputChange(user.id, 'address', e.target.value)}
                    />
                  ) : (
                    user.address
                  )}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <div>
                      <button className='edit-delete-btn' onClick={() => handleCancel()}>Cancel</button>
                      <button className='edit-delete-btn' onClick={() => handleSave(user.id)}>Save</button>
                    </div>
                  ) : (
                    
                    <div>
                    <button className='edit-delete-btn' onClick={() => handleEdit(user.id)}>Edit</button>
                    <button className='edit-delete-btn' onClick={() => handleDelete(user.id)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  updateUserAdmin: (userId, data) => dispatch(updateUserAdmin(userId, data)),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);