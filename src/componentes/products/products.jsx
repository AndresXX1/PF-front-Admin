import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllProducts, deleteProduct, updateProductAdmin } from '../../redux/Action/action';
import './products.css';

const ProductsComponent = ({ products, getAllProducts, updateProductAdmin, deleteProduct }) => {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const [editableProduct, setEditableProduct] = useState(null);
  const [editableProductValues, setEditableProductValues] = useState({});

  const handleEdit = (productId) => {
    setEditableProduct(productId);
    setEditableProductValues((prevValues) => ({
      ...prevValues,
      [productId]: { ...products.find((product) => product.id === productId) },
    }));
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      getAllProducts();
      setEditableProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleInputChange = (productId, field, value) => {
    setEditableProductValues((prevValues) => ({
      ...prevValues,
      [productId]: {
        ...prevValues[productId],
        [field]: value,
      },
    }));
  };

  const handleSave = async (productId) => {
    try {
      const productData = editableProductValues[productId];
      await updateProductAdmin(productId, productData);
      getAllProducts();
      setEditableProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancel = () => {
    setEditableProduct(null);
    setEditableProductValues({});
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
    <div className="product-table-container">
      <h2 className='titulo'>Tabla de productos</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Price per Night</th>
              <th>Season</th>
              <th>Total Rooms</th>
              <th>Pool</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {editableProduct === product.id ? (
                    <input
                      type="text"
                      value={editableProductValues[product.id]?.name || ''}
                      onChange={(e) => handleInputChange(product.id, 'name', e.target.value)}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editableProduct === product.id ? (
                    <input
                      type="text"
                      value={editableProductValues[product.id]?.location || ''}
                      onChange={(e) => handleInputChange(product.id, 'location', e.target.value)}
                    />
                  ) : (
                    product.location
                  )}
                </td>
                <td>
                  {editableProduct === product.id ? (
                    <input
                      type="text"
                      value={editableProductValues[product.id]?.pricePerNight || ''}
                      onChange={(e) => handleInputChange(product.id, 'pricePerNight', e.target.value)}
                    />
                  ) : (
                    product.pricePerNight
                  )}
                </td>
                <td>
                  {editableProduct === product.id ? (
                    <input
                      type="text"
                      value={editableProductValues[product.id]?.season || ''}
                      onChange={(e) => handleInputChange(product.id, 'season', e.target.value)}
                    />
                  ) : (
                    product.season.join(', ')
                  )}
                </td>
                <td>
                  {editableProduct === product.id ? (
                    <input
                      type="text"
                      value={editableProductValues[product.id]?.totalRooms || ''}
                      onChange={(e) => handleInputChange(product.id, 'totalRooms', e.target.value)}
                    />
                  ) : (
                    product.totalRooms
                  )}
                </td>
                <td>
                  {editableProduct === product.id ? (
                    <input
                      type="text"
                      value={editableProductValues[product.id]?.pool || ''}
                      onChange={(e) => handleInputChange(product.id, 'pool', e.target.value)}
                    />
                  ) : (
                    product.pool ? 'Yes' : 'No'
                  )}
                </td>

                <td>
                  {editableProduct === product.id ? (
                    <div>
                      <button className='edit-delete-btn' onClick={() => handleCancel()}>Cancel</button>
                      <button className='edit-delete-btn' onClick={() => handleSave(product.id)}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <button className='edit-delete-btn' onClick={() => handleEdit(product.id)}>Edit</button>
                      <button className='edit-delete-btn' onClick={() => handleDelete(product.id)}>Delete</button>
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
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(getAllProducts()),
  updateProductAdmin: (productId, data) => dispatch(updateProductAdmin(productId, data)),
  deleteProduct: (productId) => dispatch(deleteProduct(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsComponent);