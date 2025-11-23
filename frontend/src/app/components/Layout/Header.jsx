import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logout } from '../../slices/authSlice';
import { useAuth } from '../../../hooks/useAuth';

const Header = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();

  const logOutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="d-flex w-100 position-fixed">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white w-100">
        <div className="container">
          <a className="navbar-brand" href="/">Chat</a>
          {(auth.user) && <Button onClick={logOutHandler}>{t('logOut')}</Button>}
        </div>
      </nav>
    </header>
  );
};

export default Header;
