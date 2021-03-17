import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
import Input from '../components/auth/Input';
import Separator from '../components/auth/Separator';
import { FatLink, LogoBase } from '../components/shared';
import routes from '../routes';
import pageTitle from '../scripts/shared';

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
    mobileEmail: string;
    name: string;
    username: string;
    password: string;
}

const SignUp: React.FC = () => {
    const { register, handleSubmit, errors, formState } = useForm<IFormInput>({
        mode: "onChange",
    });
    const onSubmitValid = (data: IFormInput) => {
        console.log(data);
    }
    return (
        <AuthLayout>
            {/* <PageTitle title="Sign up"/> */}
            <Helmet title={pageTitle("Sign up")} />
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
                            required: "Mobile number or Email is required",
                        })}
                        name="mobileEmail"
                        type="text" placeholder="Mobile number or Email"
                        hasError={Boolean(errors?.mobileEmail?.message)} />
                    <FormError message={errors?.mobileEmail?.message} />
                    <Input 
                        ref={register({
                            required: "Name is required",
                        })}
                        name="name"
                        type="text" placeholder="Full name"
                        hasError={Boolean(errors?.name?.message)} />
                    <FormError message={errors?.name?.message} />
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
                        hasError={Boolean(errors?.username?.message)} />
                    <FormError message={errors?.username?.message} />
                    <Input 
                        ref={register({
                            required: "Password is required",
                        })}
                        name="password"
                        type="password" placeholder="Password"
                        hasError={Boolean(errors?.password?.message)} />
                    <FormError message={errors?.password?.message} />
                    <Button type="submit" value="Sign up"disabled={!formState.isValid} />
                </form>
                <Info>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</Info>
            </FormBox>
            <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
        </AuthLayout>
    );
};

export default SignUp;