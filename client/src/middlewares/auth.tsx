import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { AnyType } from '../types/app';

const authComponent = <P extends AnyType>(Component: React.ComponentType<P>) => {
  return function WrappedComponent(props: P) {
    return (
      isAuthenticated() ? <Component {...props} /> : <Navigate to="/auth" replace={true} />
    )
  };
}

export default authComponent;