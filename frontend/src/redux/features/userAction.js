import { logoutSuccess } from "./userSlice";
import { clearCart } from "./cartSlice";

export const logoutUser = () => (dispatch) => {
  dispatch(logoutSuccess());
  dispatch(clearCart());
};
