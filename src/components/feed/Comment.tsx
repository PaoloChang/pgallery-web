import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FatText } from '../shared';

const Container = styled.div``;

const CommentLine = styled.div`
  padding: 4px 0;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface IComment {
  key?: number;
  author: string;
  payload: string;
}

const Comment: React.FC<IComment> = ({ author, payload }) => {
  return (
    <Container>
      <CommentLine>
        <FatText>{author}</FatText>
        <CommentCaption>
          {payload.split(' ').map((word, index) =>
            /#[\w]+/.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
              </React.Fragment>
            ) : /@[\w]+/.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/mention/${word}`}>{word}</Link>{' '}
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{word} </React.Fragment>
            ),
          )}
        </CommentCaption>
      </CommentLine>
    </Container>
  );
};

export default Comment;
