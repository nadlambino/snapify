import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { AnyType } from '../types/app';

const guessComponent = <P extends AnyType>(Component: React.ComponentType<P>) => {
  return function WrappedComponent(props: P) {
    return (
      isAuthenticated() ? <Navigate to="/" replace={true} /> : <Component {...props} />
    )
  };
}

export default guessComponent;