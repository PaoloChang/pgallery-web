import React from 'react';
import styled from 'styled-components';

const StyledSeperator = styled.div`
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

const Separator: React.FC = () => {
    return (
        <StyledSeperator>
            <div/>
            <span>Or</span>
            <div/>
        </StyledSeperator>
    );
};

export default Separator;