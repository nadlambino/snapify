import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import UnstrictReactPropType from '../types/UnstrictReactPropType';

const withAuth = (Component: any) => {
  return function WrappedComponent(props: UnstrictReactPropType) {
    const [cookies] = useCookies()
    const isAuthenticated = cookies.token ? true : false;

    return (
      isAuthenticated ? <Component {...props} /> : <Navigate to="/auth" replace={true} />
    )
  };
}

export default withAuth;