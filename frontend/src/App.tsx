import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import { getMe } from "./store/auth/authThunk";
import { SESSION_KEY } from "./services/authService";
import AppRoutes from "./routes/AppRoutes";
import { sessionChecked } from "./store/auth/authSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem(SESSION_KEY)) {
      dispatch(getMe());
    } else {
      dispatch(sessionChecked());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
