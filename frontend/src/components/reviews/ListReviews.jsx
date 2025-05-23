import React from "react";
import StarRatings from "react-star-ratings";

const ListReviews = ({ reviews }) => {
  return (
    <div className="reviews w-75">
      <h3>Other's Reviews:</h3>
      <hr />
      {reviews?.map((review) => (
        <div key={review?._id} class="review-card my-3">
          <div className="row">
            <div className="col-1">
              <img
                src={
                  review?.user?.avatar
                    ? review?.user?.avatar?.url
                    : "/images/default_avatar.jpg"
                }
                alt="User Name"
                width="50"
                height="50"
                className="rounded-circle"
              />
            </div>
            <div className="col-11">
              <StarRatings
                rating={review?.rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="24px"
                starSpacing="2px"
                renderStarIcon={() => (
                  <i className="fa fa-star star-active"></i>
                )}
              />
              <p className="review_user">{review.user?.name}</p>
              <p className="review_comment">{review?.comment}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}

      {/* <!-- Repeat the above structure for each review --> */}
    </div>
  );
};

export default ListReviews;
