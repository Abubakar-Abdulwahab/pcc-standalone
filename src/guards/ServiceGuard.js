import PropTypes from 'prop-types';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_PAGE, PATH_AUTH } from '../routes/paths';
import { useRouteContext } from '../contexts/RouteContext';

// ----------------------------------------------------------------------

ServiceGuard.propTypes = {
  children: PropTypes.node
};

export default function ServiceGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const {dispatch} = useRouteContext()
 

  const handlePath = (to) => {
    dispatch({ type: 'NAVIGATE', payload: to });
  };
  if (!isAuthenticated) {
   handlePath()
  }

  return <>{children}</>;
}
