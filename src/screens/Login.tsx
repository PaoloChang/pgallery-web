import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import { LogoBase } from "../components/shared";
import { Helmet } from "react-helmet-async";
import pageTitle from "../scripts/shared";

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

const Login: React.FC = () => {
    return (
        <AuthLayout>
            {/* <PageTitle title="Login"/> */}
            <Helmet title={pageTitle("Login")} />
            <FormBox>
                <Logo>PGallery</Logo>
                <form style={{ marginTop: "25px" }}>
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Button type="submit" value="Log in"/>
                </form>
                <Separator/>
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare}/>
                    <span>
                        Log in with Facebook
                    </span>
                </FacebookLogin>
            </FormBox>
            <BottomBox cta="Don't have an account?" link={routes.signUp} linkText="Sign up" />
        </AuthLayout>
    )
}

export default Login;