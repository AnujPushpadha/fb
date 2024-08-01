import App from "./App";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoutes";
const RouteArray = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
];
export default RouteArray;
