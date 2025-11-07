import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import Layout from '../../components/Layout';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const logOutHandler = () => {
    localStorage.removeItem('userToken');
    dispatch(logout());
  };

  return (
    <Layout>
      <h1>chat page</h1>
      <Button onClick={logOutHandler}>{t('logOut')}</Button>
    </Layout>
  );
};

export default ChatPage;
