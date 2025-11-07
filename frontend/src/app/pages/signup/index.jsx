import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../../services/SignupService';
import { setCredentials } from '../../slices/authSlice';
import Layout from '../../components/Layout';

const SignupPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const inputRef = useRef();

  const [signUp, {
    isError: hasSignupError, error: signupError, isLoading, data: newUser,
  }] = useSignUpMutation();

  const validationSchema = yup.object().shape({
    username: yup.string().trim().required(t('requiredField')),
    password: yup.string().required(t('requiredField')).min(5, t('minCount', { count: 5 })),
    confirmPassword: yup.string()
      .oneOf(
        [yup.ref('password'), null],
        t('notMatchWithPassword'),
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => signUp(values),
  });

  useEffect(() => {
    if (newUser) {
      dispatch(setCredentials(newUser));
      localStorage.setItem('userToken', newUser.token);
      navigation('/');
    }
  }, [newUser]);

  useEffect(() => {
    if (hasSignupError) {
      inputRef.current.select();
    }
  }, [hasSignupError]);

  return (
    <Layout>
      <div className="card py-3 px-4">
        <h1 className="text-center mb-4">{t('signup.title')}</h1>
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
              isInvalid={hasSignupError || formik.errors.username}
              required
            />
            <Form.Label htmlFor="username" className="form-label">{t('signup.username')}</Form.Label>
            {formik.errors.username && <p>{formik.errors.username}</p>}
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
              isInvalid={hasSignupError || formik.errors.password}
              required
            />
            <Form.Label htmlFor="password">{t('password')}</Form.Label>
            {formik.errors.password && <p>{formik.errors.password}</p>}
          </Form.Group>
          <Form.Group className="form-floating">
            <Form.Control
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              placeholder="ConfirmPassword"
              className="form-control"
              isInvalid={hasSignupError || formik.errors.confirmPassword}
              required
            />
            <Form.Label htmlFor="confirmPassword">{t('confirmPassword')}</Form.Label>
            {formik.errors.confirmPassword && <p>{formik.errors.confirmPassword}</p>}
          </Form.Group>
          {hasSignupError && signupError.data.message && <span>{signupError.data.message}</span>}

          <Button type="submit" className="btn btn-primary" disabled={isLoading || !formik.isValid}>{t('signup.title')}</Button>
        </Form>
      </div>
      <div>
        {t('haveAccount')}
        {' '}
        <Link to="/login">{t('login.title')}</Link>
      </div>
    </Layout>
  );
};

export default SignupPage;
