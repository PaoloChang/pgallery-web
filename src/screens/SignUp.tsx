import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
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

const SignUp: React.FC = () => {
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
                <form>
                    <Input type="text" placeholder="Mobile number or Email" />
                    <Input type="text" placeholder="Full name" />
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Button type="submit" value="Sign up"/>
                </form>
                <Info>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</Info>
            </FormBox>
            <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
        </AuthLayout>
    );
};

export default SignUp;