import { Navigate } from 'react-router-dom';
import { AnyType } from '../types/app';
import useAuth from '../hooks/auth';

const guessComponent = <P extends AnyType>(Component: React.ComponentType<P>) => {
  return function WrappedComponent(props: P) {
    const { isAuthenticated } = useAuth()

    return (
      isAuthenticated ? <Navigate to="/" replace={true} /> : <Component {...props} />
    )
  };
}

export default guessComponent;