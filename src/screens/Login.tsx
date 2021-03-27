import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/auth/Button';
import LoginSeparator from '../components/auth/LoginSeparator';
import Input from '../components/auth/Input';
import FormBox from '../components/auth/FormBox';
import BottomBox from '../components/auth/BottomBox';
import routes from '../routes';
import { LogoBase } from '../components/shared';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormError from '../components/auth/FormError';
import PageTitle from '../components/PageTitle';
import { gql, useMutation } from '@apollo/client';
import { logUserIn } from '../apollo';
import { useLocation } from 'react-router';
import { login, loginVariables } from '../__generated__/login';

const FacebookLogin = styled.div`
  margin: 10px 0 20px;
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Logo = styled(LogoBase)`
  font-size: 25px;
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const LoginBtn = styled(Button)`
  margin-top: 15px;
`;

interface ILocationState {
  message: string;
  username: string;
  password: string;
}

interface IForm {
  username: string;
  password: string;
  result: string;
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      status
      token
      error
    }
  }
`;

const Login: React.FC = () => {
  const location = useLocation<ILocationState>();
  // console.log(location)
  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: 'onChange',
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
  });

  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => {
        const {
          login: { status, error, token },
        } = data;
        if (!status) {
          return setError('result', {
            message: error !== null ? error : '',
          });
        }
        if (token) {
          logUserIn(token);
        }
      },
    },
  );

  const onSubmitValid: SubmitHandler<IForm> = (params) => {
    if (loading) return;
    const { username, password } = params;
    login({
      variables: { username, password },
    });
  };

  const clearLoginError = () => {
    clearErrors('result');
  };

  return (
    <AuthLayout>
      <PageTitle title={'Login'} />
      <FormBox>
        <Logo>PGallery</Logo>
        <Notification>{location?.state?.message}</Notification>
        <form
          onSubmit={handleSubmit(onSubmitValid)}
          style={{ marginTop: '25px' }}
        >
          <Input
            ref={register({
              required: 'Username is required',
              minLength: {
                value: 6,
                message: 'Username should be longer than 6 characters',
              },
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: 'Password is required',
            })}
            onChange={clearLoginError}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <FormError message={errors?.result?.message} />
          <LoginBtn
            type="submit"
            value={loading ? 'Loading...' : 'Log in'}
            disabled={!formState.isValid || loading}
          />
        </form>
        <LoginSeparator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
};

export default Login;
