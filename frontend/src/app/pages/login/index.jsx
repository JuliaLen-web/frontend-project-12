import { useFormik } from 'formik';
import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice';
import { useLogInMutation } from '../../services/LoginService';
import Layout from '../../components/Layout';
import { useAuth } from '../../../hooks/useAuth';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const auth = useAuth();

  const [
    logIn,
    {
      isError: hasLoginError, error: loginError, isLoading: isLoadingLogin,
    },
  ] = useLogInMutation();

  const validationSchema = yup.object().shape({
    username: yup.string().trim().required(t('requiredField')),
    password: yup.string().required(t('requiredField')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userInfo = await logIn(values).unwrap();
        dispatch(setCredentials(userInfo));
        navigate('/');
        toast.success(t('login.success'));
      } catch (e) {
        inputRef.current?.select();
        toast.error(t('login.error'));
      }
    },
  });

  if (auth.user) return <Navigate to="/" replace />;

  return (
    <Layout>
      <div className="card py-3 px-4 col-12 col-lg-4">
        <h1 className="text-center mb-4">{t('login.title')}</h1>
        <Form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
          <Form.Group className="form-floating">
            <Form.Control
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="Username"
              className="form-control"
              ref={inputRef}
              isInvalid={formik.errors.username}
              required
            />
            <Form.Label htmlFor="username" className="form-label">{t('login.username')}</Form.Label>
            {formik.errors.username && (
              <p className="text-danger">{formik.errors.username}</p>
            )}
          </Form.Group>

          <Form.Group className="form-floating">
            <Form.Control
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
              className="form-control"
              isInvalid={formik.errors.password}
              required
            />
            <Form.Label htmlFor="password">{t('password')}</Form.Label>
            {formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </Form.Group>
          {hasLoginError && loginError && <p className="text-danger">{t('login.error')}</p>}
          <Button type="submit" className="btn btn-primary" disabled={isLoadingLogin || !formik.isValid}>{t('login.title')}</Button>
        </Form>
      </div>
      <div>
        {t('haveNotAccount')}
        {' '}
        <Link to="/signup">{t('signup.title')}</Link>
      </div>
    </Layout>
  );
};

export default LoginPage;
