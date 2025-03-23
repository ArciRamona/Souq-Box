// const CartSync = () => {
//   const { cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.auth); // or state.user depending on your userSlice

//   useEffect(() => {
//     if (user?._id) {
//       localStorage.setItem(`cartItems_${user._id}`, JSON.stringify(cartItems));
//       console.log("🟡 Saving cart for:", user._id, cartItems);
//     }
//   }, [cartItems, user?._id]);

//   return null;
// };

// export default CartSync;

// The part that actually fixed it was:

// 	 Switching from user.id to user._id

// Since your backend (probably MongoDB) returns the user’s ID as _id, and all your cart-saving/loading logic was using user.id, there was a mismatch — meaning:
// 	•	It was saving to cartItems_undefined
// 	•	And trying to load from cartItems_undefined

// Once you used user?._id consistently in both CartSync and CartLoader, it correctly:
// 	•	📝 Saved to cartItems_6769abc123 after add-to-cart
// 	•	📥 Loaded from the same key when the same user logged in

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const CartSync = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id || user?.id;
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (userId) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
      console.log("🟡 Saved cart for:", userId, cartItems);
    }
  }, [cartItems, userId]);

  return null;
};

export default CartSync;
