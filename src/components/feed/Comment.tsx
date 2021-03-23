import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';

const Container = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

interface IComment {
  key?: number;
  author: string;
  payload: string;
}

const Comment: React.FC<IComment> = ({ author, payload }) => {
  return (
    <Container>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </Container>
  );
};

export default Comment;
