import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchReviews, deleteReview } from "../../redux/Action/action";
import "./review.css";

const ReviewsTableComponent = ({ reviews, fetchReviews, deleteReview }) => {
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (productId, reviewId) => {
    try {
      console.log("Deleting review:", productId, reviewId);
      await deleteReview(productId, reviewId);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
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
    <div className="reviews-table-container">
      <h2 className="titulo">Todas las Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Product ID</th>
            <th>Content</th>
           
            <th>Rating</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.name}</td>
              <td>{review.surName}</td>
              <td>{review.productId}</td>
              <td>{review.content}</td>
             
              <td>{review.rating}</td>
              <td>{review.userId}</td>
              <td>
                <button
                  onClick={() => handleDelete(review.productId, review.id)}
                >
                  Delete
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