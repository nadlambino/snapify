import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import UnstrictReactPropType from '../types/UnstrictReactPropType';

const withoutAuth = (Component: any) => {
  return function WrappedComponent(props: UnstrictReactPropType) {
    const [cookies] = useCookies()
    const isAuthenticated = cookies.token ? true : false;

    return (
      isAuthenticated ? <Navigate to="/" replace={true} /> : <Component {...props} />
    )
  };
}

export default withoutAuth;