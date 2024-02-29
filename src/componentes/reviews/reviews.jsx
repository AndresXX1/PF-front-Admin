import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchReviews, deleteReview } from "../../redux/Action/action";
import "./review.css";
import DeleteIcon from '@mui/icons-material/Delete';

const ReviewsTableComponent = ({ reviews, fetchReviews, deleteReview }) => {
  useEffect(() => {
    fetchReviews(); // Llamar a fetchReviews cuando el componente se monte o se actualice
  }, [fetchReviews]);



  const handleDelete = async (productId, reviewId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta review? esta accion no se puede desacer ya que se borra de la base de datos')) {
       try {
         await deleteReview(productId, reviewId);
         fetchReviews();
       } catch (error) {
         console.error("Error deleting review:", error);
       }
    }
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
    <div className="reviews-table-container">
      <h2 className="titulod">Todas las Reviews</h2>
      <table>
        <thead>
          <tr>
            <th style={{ border: "transparent", backgroundColor: "salmon"}}>ID</th>
            <th style={{ border: "transparent", backgroundColor: "salmon"}}>Name</th>
            <th style={{ border: "transparent", backgroundColor: "salmon"}}>Surname</th>
            <th style={{ border: "transparent", backgroundColor: "salmon"}}>Product ID</th>
            <th style={{ border: "transparent", backgroundColor: "salmon"}}>Content</th>
           
            <th style={{ border: "transparent", backgroundColor: "salmon"}}>Rating</th>
            <th style={{ border: "transparent", backgroundColor: "salmon"}}> Estado</th>
            <th style={{ border: "transparent", backgroundColor: "salmon"}}> Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews && reviews.map((review) => (
            <tr key={review.id} style={{ backgroundColor: 'transparent' }}>
              <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{review.id}</td>
              <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{review.name}</td>
              <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{review.surName}</td>
              <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{review.productId}</td>
              <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{review.content}</td>
             
              <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{review.rating}</td>
              <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{review.activo}</td>
              <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                <button className="delete"
                  onClick={() => handleDelete(review.productId, review.id)}
                >
                  <DeleteIcon/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  reviews: state.reviews,
});

const mapDispatchToProps = (dispatch) => ({
  fetchReviews: () => dispatch(fetchReviews()),
  deleteReview: (productId, reviewId) =>
    dispatch(deleteReview(productId, reviewId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewsTableComponent);