import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCart } from "../../redux/features/cartSlice";

const CartLoader = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth); // or state.userSlice
  const userId = user?._id;

  useEffect(() => {
    if (isAuthenticated && userId) {
      const savedCart = localStorage.getItem(`cartItems_${userId}`);
      if (savedCart) {
        dispatch(loadCart(JSON.parse(savedCart)));
        console.log("🟢 Loaded cart for:", userId);
      }
    }
  }, [userId, isAuthenticated, dispatch]);

  return null;
};

export default CartLoader;
