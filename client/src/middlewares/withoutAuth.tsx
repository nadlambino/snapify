import { Navigate } from 'react-router-dom';
import UnstrictReactPropType from '../types/UnstrictReactPropType';
import { isAuthenticated } from '../utils/auth';

const withoutAuth = (Component: any) => {
  return function WrappedComponent(props: UnstrictReactPropType) {

    return (
      isAuthenticated() ? <Navigate to="/" replace={true} /> : <Component {...props} />
    )
  };
}

export default withoutAuth;