import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllProducts, deleteProduct, updateProductAdmin } from '../../redux/Action/action';
import './products.css';
import Select from 'react-select';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


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






  const handleCancel = () => {
    setEditableProduct(null);
    setEditableProductValues({});
  };

  const handleSave = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres guardar los cambios? esta accion es irreversible')) {
       try {
         const productData = editableProductValues[productId];
         await updateProductAdmin(productId, productData);
         getAllProducts();
         setEditableProduct(null);
       } catch (error) {
         console.error('Error updating product:', error);
       }
    }
   };
   
   const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto? esta accion es irreversible ya que se borrara de la base de datos')) {
       try {
         await deleteProduct(productId);
         getAllProducts();
         setEditableProduct(null);
       } catch (error) {
         console.error('Error deleting product:', error);
       }
    }
   };

   const locationOptions = [
    'El Bolsón, Provincia de Río Negro',
    'Villa Pehuenia, Provincia de Neuquén',
    'Purmamarca, Provincia de Jujuy',
    'Villa Traful, Provincia de Neuquén',
    'Las Grutas, Provincia de Río Negro',
    'San Javier, Provincia de Tucumán',
    'Los Reartes, Provincia de Córdoba',
    'Caviahue, Provincia de Neuquén',
    'Tafí del Valle, Provincia de Tucumán',
    'Villa Meliquina, Provincia de Neuquén',
    'San Marcos Sierras, Provincia de Córdoba',
    'Cuesta Blanca, Provincia de Córdoba',
    'El Soberbio, Provincia de Misiones',
    'Villa General Roca, Provincia de Córdoba',
    'Colonia Suiza, Provincia de Río Negro',
    'San Antonio de los Cobres, Provincia de Salta',
    'Tilcara, Provincia de Jujuy',
    'El Condor, Provincia de Río Negro',
    'Villa Yacanto, Provincia de Córdoba',
    'Cholila, Provincia de Chubut',
    'Villa La Angostura, Provincia de Neuquén',
    'Santa Ana, Provincia de Misiones',
    'Las Rabonas, Provincia de Córdoba',
    'Yavi, Provincia de Jujuy',
    'Villa Ciudad Parque Los Reartes, Provincia de Córdoba',
    'Villa Cura Brochero, Provincia de Córdoba',
    'Villa Berna, Provincia de Córdoba',
    'Los Molles, Provincia de San Luis',
    'Los Alerces, Provincia de Chubut',
    'Nono, Provincia de Córdoba',
    'Lago Puelo, Provincia de Chubut',
    'La Cumbrecita, Provincia de Córdoba',
    'San Pedro de Colalao, Provincia de Tucumán',
    'Villa Lago Meliquina, Provincia de Neuquén',
    'Los Hornillos, Provincia de Córdoba',
    'Villa Quila Quina, Provincia de Neuquén',
    'Capilla del Monte, Provincia de Córdoba',
    'El Chocón, Provincia de Neuquén',
    'Maimará, Provincia de Jujuy',
    'Miramar, Provincia de Córdoba',
    'Villa Giardino, Provincia de Córdoba',
    'El Mollar, Provincia de Tucumán',
    'El Hoyo, Provincia de Chubut',
    'Yacanto de Calamuchita, Provincia de Córdoba',
    'Villa Ventana, Provincia de Buenos Aires',
    'San Roque, Provincia de Córdoba',
    'Villa de Las Rosas, Provincia de Córdoba',
    'El Maitén, Provincia de Chubut',
    'San José de la Dormida, Provincia de Córdoba',
    'Merlo, Provincia de San Luis',
    'Potrerillos, Provincia de Mendoza'
   ];

   const handleInputChange = (productId, field, value) => {
    setEditableProductValues((prevValues) => ({
       ...prevValues,
       [productId]: {
         ...prevValues[productId],
         [field]: value,
       },
    }));
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
    <div className="product-table-container">
      <h2 className='titulo'>Tabla de productos</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>ID</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Name</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Location</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Price per Night</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Season</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Total Rooms</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Pool</th>
              
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.map(product => (
              <tr key={product.id} style={{ backgroundColor: 'transparent' }}>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{product.id}</td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                  {editableProduct === product.id ? (
                    <input style={{ width: "150px"}}
                      type="text"
                      value={editableProductValues[product.id]?.name || ''}
                      onChange={(e) => handleInputChange(product.id, 'name', e.target.value)}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                    {editableProduct === product.id ? (
                        <select
                          style={{ width: "300px", height: "40px", marginTop: "-15px", borderRadius: "5px" }}
                          value={editableProductValues[product.id]?.location || ''}
                          onChange={(e) => handleInputChange(product.id, 'location', e.target.value)}
                        >
                          <option value="">Select a location</option>
                          {locationOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                    ) : (
                        product.location
                    )}
                    </td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                  {editableProduct === product.id ? (
                    <input style={{ width: "150px"}}
                      type="text"
                      value={editableProductValues[product.id]?.pricePerNight || ''}
                      onChange={(e) => handleInputChange(product.id, 'pricePerNight', e.target.value)}
                    />
                  ) : (
                    product.pricePerNight
                  )}
                </td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                  {editableProduct === product.id ? (
                    <input style={{ width: "150px"}}
                      type="text"
                      value={editableProductValues[product.id]?.season || ''}
                      onChange={(e) => handleInputChange(product.id, 'season', e.target.value)}
                    />
                  ) : (
                    product.season.join(', ')
                  )}
                </td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                  {editableProduct === product.id ? (
                    <input style={{ width: "150px"}}
                      type="text"
                      value={editableProductValues[product.id]?.totalRooms || ''}
                      onChange={(e) => handleInputChange(product.id, 'totalRooms', e.target.value)}
                    />
                  ) : (
                    product.totalRooms
                  )}
                </td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                  {editableProduct === product.id ? (
                    <input style={{ width: "150px"}}
                      type="text"
                      value={editableProductValues[product.id]?.pool || ''}
                      onChange={(e) => handleInputChange(product.id, 'pool', e.target.value)}
                    />
                  ) : (
                    product.pool ? 'Yes' : 'No'
                  )}
                </td>

                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                        {editableProduct === product.id ? (
                            <div>
                              <button className='delete' onClick={() => handleCancel()}>
                                <CancelIcon />
                              </button>
                              <button className='delete' onClick={() => handleSave(product.id)}>
                                <SaveIcon />
                              </button>
                            </div>
                        ) : (
                            <div>
                              <button className='delete' onClick={() => handleEdit(product.id)}>
                                <EditIcon />
                              </button>
                              <button className='delete' onClick={() => handleDelete(product.id)}>
                                <DeleteIcon />
                              </button>
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