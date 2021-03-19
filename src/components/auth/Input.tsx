import styled from 'styled-components';

const Input = styled.input<{ hasError: Boolean }>`
    width: 100%;
    padding: 7px;
    background-color: #FAFAFA;
    border: 0.5px solid ${(props) => props.hasError ? "tomato" : props.theme.borderColor};
    border-radius: 3px;
    margin-top: 5px;
    box-sizing: border-box;
    color: rgb(38, 38, 38);
    &::placeholder {
        font-size: 13px;
    }
    &:focus {
        color: rgb(38, 38, 38);
        border-color: rgb(38, 38, 38);
    }
`;

export default Input;