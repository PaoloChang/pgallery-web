import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseBox } from '../shared';

// const Container = styled(BaseBox)`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     padding: 35px 40px 10px 40px;
//     margin-bottom: 10px;
//     form {
//         width: 100%;
//         display: flex;
//         justify-content: center;
//         flex-direction: column;
//         align-items: center;
//     }
// `;

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
  cta: string;
  link: string;
  linkText: string;
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
