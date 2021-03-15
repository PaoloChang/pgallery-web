import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Container = styled.div``
// background-color: ${(props) => props.theme.bgColor }
const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const Login: React.FC = () => {
    return (
        <Container>
            <Title>Login</Title>
            <button onClick={() => darkModeVar(true)}>To dark</button>
            <button onClick={() => darkModeVar(false)}>To light</button>
        </Container>
    )
}

export default Login;