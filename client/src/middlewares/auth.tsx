import { Navigate } from 'react-router-dom';
import { AnyType } from '../types/app';
import useAuth from '../hooks/auth';

const authComponent = <P extends AnyType>(Component: React.ComponentType<P>) => {
  return function WrappedComponent(props: P) {
    const {isAuthenticated} = useAuth()

    return (
      isAuthenticated ? <Component {...props} /> : <Navigate to="/auth" replace={true} />
    )
  };
}

export default authComponent;