import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseBox } from '../shared';

const Container = styled(BaseBox)`
    padding: 20px 0px;
    text-align: center;
    a {
        margin-left: 5px;
        font-weight: 600;
        color: rgb(0, 149, 246);
    }
`;

interface IBottomBoxProps {
    cta: string
    link: string
    linkText: string
}

const BottomBox: React.FC<IBottomBoxProps> = ({ cta, link, linkText }) => {
    return (
        <Container>
            <span>{cta}</span>
            <Link to={link}>{linkText}</Link>
        </Container>
    );
};

export default BottomBox;