import { Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  MdLogout,
  MdOutlineLibraryAdd,
  MdOutlineDynamicFeed,
} from 'react-icons/md';
import { useContext, useState } from 'react';
import Form from './Form';
import Create from './Post/Create';
import { FeedContext } from '../contexts/FeedContext';

export default function Header() {
  const [_cookies, _setCookies, removeCookie] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { setReload } = useContext(FeedContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMenuActiveClass = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleSignOut = () => {
    removeCookie('token');
    navigate('/auth');
  };

  const handleFeedClick = () => {
    navigate('/');
    setReload(true);
  };

  return (
    <div className="header">
      <Link
        to={'/'}
        onClick={handleFeedClick}
        className="header-logo"
      >
        <div className="flex flex-col">
          <span className="font-bold text-gray-800">SNAPIFY</span>
        </div>
      </Link>
      <div className="header-menu">
        <MdOutlineDynamicFeed
          size={30}
          className={`btn-icon header-btn ${getMenuActiveClass('/')}`}
          onClick={handleFeedClick}
        />
        <MdOutlineLibraryAdd
          size={30}
          className={`btn-icon header-btn `}
          onClick={handleClickOpen}
        />
        <MdLogout
          size={30}
          className="btn-icon header-btn"
          onClick={handleSignOut}
        />
      </div>
      <Form
        save="POST"
        saveIcon={<MdOutlineLibraryAdd size={20} />}
        show={open}
        closeCallback={handleClose}
        component={Create}
      ></Form>
    </div>
  );
}
