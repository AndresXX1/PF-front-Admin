import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser, updateUserAdmin, unbanUser, banUser } from '../../redux/Action/action';
import './usuarioss.css';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';

const UsersComponent = ({ users, fetchUsers, updateUserAdmin, deleteUser, banUser, unbanUser }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const [editableUser, setEditableUser] = useState(null);
  const [editableUserValues, setEditableUserValues] = useState({});
  const roles = ["admin", "buyer"];

 

  const handleBanUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres bannear este usuario?')) {
       try {
         await banUser(userId);
         fetchUsers(); // Asegúrate de que 'fetchUsers' sea la función correcta para actualizar la lista de usuarios
         setEditableUser(null);
       } catch (error) {
         console.error('Error banning user:', error);
       }
    }
   };
   
   const handleUnbanUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres des-bannear este Usuario?')) {
       try {
         await unbanUser(userId);
         fetchUsers();
         setEditableUser(null);
       } catch (error) {
         console.error('Error unbanning user:', error);
       }
    }
   };
   
   const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este Usuario? Esta acción es irreversible y se borrará de la base de datos')) {
       try {
         await deleteUser(userId);
         fetchUsers();
         setEditableUser(null);
       } catch (error) {
         console.error('Error deleting user:', error);
       }
    }
   };
   
   const handleSave = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres guardar los cambios?')) {
       try {
         const userData = editableUserValues[userId];
         await updateUserAdmin(userId, userData);
         fetchUsers();
         setEditableUser(null);
       } catch (error) {
         console.error('Error updating user:', error);
       }
    }
   };

  const handleEdit = (userId) => {
    setEditableUser(userId);
    setEditableUserValues((prevValues) => ({
      ...prevValues,
      [userId]: { ...users.find((user) => user.id === userId) },
    }));
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




  const handleCancel = () => {
    setEditableUser(null);
    setEditableUserValues({});
  };

  return (
    <div style={{
      border: "1px solid transparent",
      marginTop: "100px",
      height: "720px",
      width: "auto",
      marginLeft: "230px",
      borderRadius: "10px",
      backgroundColor: "transparent",
      marginBottom: "50px"
    }}>
      <div className="user">
        <h2 className='titulod'>Tabla de usuarios</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style={{ border: "transparent", backgroundColor: "salmon",}}>ID</th>
                <th style={{ border: "transparent", backgroundColor: "salmon",}}>ROL</th>
                <th style={{ border: "transparent", backgroundColor: "salmon",}}>Name</th>
                <th style={{ border: "transparent", backgroundColor: "salmon",}}>Surname</th>
                <th style={{ border: "transparent", backgroundColor: "salmon",}}>Email</th>
                <th style={{ border: "transparent", backgroundColor: "salmon",}}>Password</th>

                <th style={{ border: "transparent", backgroundColor: "salmon",}}>Banned</th>
                <th style={{ border: "transparent", backgroundColor: "salmon",}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map(user => (
                <tr key={user.id} style={{ backgroundColor: 'transparent' }}>
                  <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}
                  >{user.id}</td>

                  <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                    {editableUser === user.id ? (
                      <select style={{ width: "100px", height: "40px", marginTop:"-20px", borderRadius:"5px"}}
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


                  <td style={{ border: "transparent", padding: "15px", textAlign: "left" , fontSize: "20px"}}>
                    {editableUser === user.id ? (
                      <input style={{ width: "150px" }}
                        type="text"
                        value={editableUserValues[user.id]?.name || ''}
                        onChange={(e) => handleInputChange(user.id, 'name', e.target.value)}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td style={{ border: "transparent", padding: "15px", textAlign: "left" , fontSize: "20px"}}>
                    {editableUser === user.id ? (
                      <input style={{ width: "150px" }}
                        type="text"
                        value={editableUserValues[user.id]?.surName || ''}
                        onChange={(e) => handleInputChange(user.id, 'surName', e.target.value)}
                      />
                    ) : (
                      user.surName
                    )}
                  </td>
                  <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                    {editableUser === user.id ? (
                      <input style={{ width: "150px", }}
                        type="text"
                        value={editableUserValues[user.id]?.email || ''}
                        onChange={(e) => handleInputChange(user.id, 'email', e.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                    {editableUser === user.id ? (
                      <input style={{ width: "150px" }}
                        type="text"
                        value={editableUserValues[user.id]?.password || ''}
                        onChange={(e) => handleInputChange(user.id, 'password', e.target.value)}
                      />
                    ) : (
                      user.password
                    )}
                  </td>
   
                  <td style={{ border: "transparent", padding: "15px", textAlign: "left" , fontSize: "20px"}}>
                    {user.banned ? "True" : "False"}
                  </td>
                  <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                    {editableUser === user.id ? (
                      <div>
                        <button className="delete" onClick={() => handleCancel()}><CancelIcon/></button>
                        <button className="delete" onClick={() => handleSave(user.id)}><SaveIcon/></button>
                      </div>
                    ) : (

                        <div>
                          <button className="delete" onClick={() => handleEdit(user.id)}><EditIcon/></button>
                          <button className="delete" onClick={() => handleDelete(user.id)}><DeleteIcon/></button>
                          
                             {user.banned ? (
                               <button className="delete" onClick={() => handleUnbanUser(user.id)}><CheckCircleIcon /> des-bannear</button>
                             ) : (
                                 <button className="delete" onClick={() => handleBanUser(user.id)}><BlockIcon />  bannear</button>
                               )}
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

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  updateUserAdmin: (userId, data) => dispatch(updateUserAdmin(userId, data)),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
  banUser: (userId) => dispatch(banUser(userId)),
  unbanUser: (userId) => dispatch(unbanUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);