import { gql, useMutation } from '@apollo/client';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
import Input from '../components/auth/Input';
import Separator from '../components/auth/Separator';
import PageTitle from '../components/PageTitle';
import { FatLink, LogoBase } from '../components/shared';
import routes from '../routes';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Subtitle = styled(FatLink)`
    margin-top: 20px;
    font-size: 16px;
    text-align: center;
`;

const Info = styled.span`
    width: 90%;
    margin: 15px 0;
    font-size: 11px;
    text-align: center;
`;

const Logo = styled(LogoBase)`
    font-size: 25px;
`;

interface IFormInput {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    result: string
}

const CREATE_ACCOUNT_MUTATION =gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $username: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ) {
            status
            error
        }
    }
`;

const SignUp: React.FC = () => {
    const history = useHistory();

    const { 
        register, handleSubmit, errors, formState, setError, clearErrors, getValues 
    } = useForm<IFormInput>({
        mode: "onChange",
    });

    const [ createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted: (data) => {
            const { createAccount: { status, error }} = data;
            const { username, password } = getValues();
            if (!status) {
                return setError("result", {
                    message: error
                });
            };
            console.log(`onCompleted: sending ${username}, ${password} as a state`)
            const state = {
                message: "Account created. Please log in.", 
                username, 
                password
            }
            console.log(state)
            history.push(routes.home, {
                message: "Account created. Please log in."
            });
        }
    });

    
    const onSubmitValid = (data: IFormInput) => {
        if (loading) return
        createAccount({
            variables: {
                ...data
            }
        })
    }
    
    const clearLoginError = () => {
        clearErrors("result");
    }

    return (
        <AuthLayout>
            <PageTitle title="Sign up"/>
            <FormBox>
                <HeaderContainer>
                    <Logo>PGallery</Logo>
                    <Subtitle>
                        Sign up to see photos and videos from your friends.
                    </Subtitle>
                    <Button type="submit" value="Log in with Facebook"/>
                    <Separator/>
                </HeaderContainer>
                <form
                    onSubmit={handleSubmit(onSubmitValid)} >
                    <Input 
                        ref={register({
                            required: "First name is required",
                        })}
                        name="firstName"
                        type="text" placeholder="First name"
                        onChange={clearLoginError}
                        hasError={Boolean(errors?.firstName?.message)} />
                    <FormError message={errors?.firstName?.message} />
                    <Input 
                        ref={register}
                        name="lastName"
                        type="text" placeholder="Last name"
                        onChange={clearLoginError}
                        hasError={Boolean(errors?.lastName?.message)} />
                    <FormError message={errors?.lastName?.message} />
                    <Input 
                        ref={register({
                            required: "Username is required",
                            minLength: {
                                value: 6,
                                message: "Username should be longer than 6"
                            }
                        })}
                        name="username"
                        type="text" placeholder="Username"
                        onChange={clearLoginError}
                        hasError={Boolean(errors?.username?.message)} />
                    <FormError message={errors?.username?.message} />
                    <Input 
                        ref={register({
                            required: "E-mail is required",
                        })}
                        name="email"
                        type="email" placeholder="E-mail"
                        onChange={clearLoginError}
                        hasError={Boolean(errors?.email?.message)} />
                    <FormError message={errors?.email?.message} />
                    <Input 
                        ref={register({
                            required: "Password is required",
                        })}
                        name="password"
                        type="password" placeholder="Password"
                        onChange={clearLoginError}
                        hasError={Boolean(errors?.password?.message)} />
                    <FormError message={errors?.password?.message} />
                    <FormError message={errors?.result?.message} />
                    <Button 
                        type="submit" 
                        value={ loading ? "Loading..." : "Sign up" }
                        disabled={!formState.isValid || loading} />
                </form>
                <Info>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</Info>
            </FormBox>
            <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
        </AuthLayout>
    );
};

export default SignUp;