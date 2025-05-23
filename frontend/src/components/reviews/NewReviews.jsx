import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { useSumbitReviewMutation } from "../../redux/api/productsApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useCanUserReviewQuery } from "../../redux/api/productsApi";

const Reviews = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [submitReview, { error, isSuccess }] = useSumbitReviewMutation();

  const submitHandler = () => {
    const reviewData = { rating, comment, productId };
    submitReview(reviewData);
  };

  const { data } = useCanUserReviewQuery(productId);
  const canReview = data?.canReview;

  useEffect(() => {
    if (error) {
      console.log("❌ Review check error:", error);
      toast.error("Unable to check review permission");
    }
  }, [error]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "An unexpected error occurred");
    }

    if (isSuccess) {
      toast.success("Review submitted successfully");
    }
  }, [error, isSuccess]);
  return (
    <div>
      {canReview && (
        <button
          id="review_btn"
          type="button"
          class="btn btn-primary mt-4"
          data-bs-toggle="modal"
          data-bs-target="#ratingModal"
        >
          Submit Your Review
        </button>
      )}

      <div class="row mt-2 mb-5">
        <div class="rating w-50">
          <div
            class="modal fade"
            id="ratingModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="ratingModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="ratingModalLabel">
                    Submit Review
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    name="rating"
                    changeRating={(e) => setRating(e)}
                  />

                  <textarea
                    name="review"
                    id="review"
                    class="form-control mt-4"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>

                  <button
                    id="new_review_btn"
                    class="btn w-100 my-4 px-4"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
