import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_PAGE, PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

ServiceGuard.propTypes = {
  children: PropTypes.node
};

export default function ServiceGuard({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={PATH_AUTH.login} />;
  }

  return <>{children}</>;
}
