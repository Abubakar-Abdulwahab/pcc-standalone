import PropTypes from "prop-types";

// hooks
import useAuth from "../hooks/useAuth";
// routes
import { PATH_DASHBOARD } from "../routes/paths";
import { useRouteContext } from "../contexts/RouteContext";

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, user } = useAuth();
  const { dispatch } = useRouteContext();
  const [searchParams] = useSearchParams();

  if (isAuthenticated) {
    if (searchParams.get("redirectUrl")) {
      dispatch({
        type: "NAVIGATE",
        payload: '/'
        
      });
      
    }
    dispatch({
      type: "NAVIGATE",
      payload: '/'
      
    });
  }

  return <>{children}</>;
}
