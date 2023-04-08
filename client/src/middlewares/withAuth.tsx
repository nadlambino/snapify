import { Navigate } from 'react-router-dom';
import UnstrictReactPropType from '../types/UnstrictReactPropType';
import { isAuthenticated } from '../utils/auth';

const withAuth = (Component: any) => {
  return function WrappedComponent(props: UnstrictReactPropType) {

    return (
      isAuthenticated() ? <Component {...props} /> : <Navigate to="/auth" replace={true} />
    )
  };
}

export default withAuth;