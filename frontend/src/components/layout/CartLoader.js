import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCart } from "../../redux/features/cartSlice";

const CartLoader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id || user?.id;

  useEffect(() => {
    if (userId) {
      const savedCart = localStorage.getItem(`cartItems_${userId}`);
      if (savedCart) {
        dispatch(loadCart(JSON.parse(savedCart)));
        console.log("🟢 Loaded cart from localStorage for:", userId);
      }
    }
  }, [userId, dispatch]);

  return null;
};

export default CartLoader;
