import styled from "styled-components";

const StyledFormError = styled.span`
    margin: 10px 0;
    color: tomato;
    font-size: 11px;
    font-weight: 700;
`;

interface IFormErrorProps {
    message: string | undefined;
}

const FormError: React.FC<IFormErrorProps> = ({message}) => {
    return message === "" || !message ? null : <StyledFormError>{message}</StyledFormError>
}

export default FormError;