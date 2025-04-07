import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../redux/api/userApi";
import {
  setUser,
  setIsAuthenticated,
  setLoading,
} from "../../redux/features/authSlice";

const AuthLoader = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(userApi.endpoints.getMe.initiate(null))
        .unwrap()
        .then((user) => {
          dispatch(setUser(user));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        })
        .catch(() => {
          dispatch(setIsAuthenticated(false));
          dispatch(setLoading(false));
        });
    } else {
      dispatch(setLoading(false));
    }
    console.log("🧠 AuthLoader token from Redux:", token);
  }, [token, dispatch]);

  return null;
};

export default AuthLoader;
