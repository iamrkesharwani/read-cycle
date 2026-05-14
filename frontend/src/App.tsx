import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import { getMe } from "./store/auth/authThunk";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
