import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
`;

const WhiteBox = styled.div`
    background-color: white;
    border: 1px solid ${(props) => props.theme.borderColor};
    width: 100%;
`;

const Seperator = styled.div`
    margin: 20px 0;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    div {
        width: 100%;
        height: 1px;
        background-color: rgb(219, 219, 219);
    }
    span {
        margin: 0 10px;
        color: rgb(219, 219, 219);
        font-weight: 600;
    }
`;

const TopBox = styled(WhiteBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 10px 40px;
    margin-bottom: 10px;
    form {
        margin-top: 35px;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 7px;
    background-color: #FAFAFA;
    border: 0.5px solid ${(props) => props.theme.borderColor};
    border-radius: 3px;
    margin-top: 5px;
    box-sizing: border-box;
    &::placeholder {
        font-size: 13px;
    }
`;

const Button = styled.input`
    width: 100%;
    border: none;
    margin-top: 15px;
    background-color: ${(props) => props.theme.accent};
    color: white;
    text-align: center;
    padding: 6px 0px;
    font-weight: 600;
`;

const FacebookLogin = styled.div`
    margin: 10px 0 20px;
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const BottomBox = styled(WhiteBox)`
    padding: 20px 0px;
    text-align: center;
    a {
        margin-left: 5px;
        font-weight: 600;
        color: rgb(0, 149, 246);
    }
`;


const Login: React.FC = () => {
    return (
        <Container>
            <Wrapper>
                <TopBox>
                    <div>
                        <FontAwesomeIcon icon={faInstagram} size="3x" />
                    </div>
                    <h1>PGallery</h1>
                    <form>
                        <Input type="text" placeholder="Username" />
                        <Input type="password" placeholder="Password" />
                        <Button type="submit" value="Log in"/>
                    </form>
                    <Seperator>
                        <div/>
                        <span>Or</span>
                        <div/>
                    </Seperator>
                    <FacebookLogin>
                        <FontAwesomeIcon icon={faFacebookSquare}/>
                        <span>
                            Log in with Facebook
                        </span>
                    </FacebookLogin>
                </TopBox>
                <BottomBox>
                    <span>Don't have an account?</span>
                    <a href="#">Sing up</a>
                </BottomBox>
            </Wrapper>
        
        </Container>
    )
}

export default Login;