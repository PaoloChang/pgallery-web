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
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import PageTitle from "../components/PageTitle";

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

interface IFormInput {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit, errors, formState } = useForm<IFormInput>({
        mode: "onChange",
    });

    const onSubmitValid = (data: IFormInput) => {
        console.log(data);
    }

    console.log(formState.isValid)
    return (
        <AuthLayout>
            <PageTitle title={"Login"} />
            <FormBox>
                <Logo>PGallery</Logo>
                <form 
                    onSubmit={handleSubmit(onSubmitValid)} 
                    style={{ marginTop: "25px" }}>
                    <Input 
                        ref={register({
                            required: "Username is required",
                            minLength: {
                                value: 6,
                                message: "Username should be longer than 6 characters"
                            },
                        })} 
                        name="username" 
                        type="text" 
                        placeholder="Username"
                        hasError={Boolean(errors?.username?.message)} />
                    <FormError message={errors?.username?.message} />
                    <Input 
                        ref={register({
                            required: "Password is required",
                        })}  
                        name="password" 
                        type="password" 
                        placeholder="Password"
                        hasError={Boolean(errors?.password?.message)} />
                    <FormError message={errors?.password?.message} />
                    <Button type="submit" value="Log in" disabled={!formState.isValid} />
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