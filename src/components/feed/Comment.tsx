import { gql, useMutation } from '@apollo/client';
// import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const DeleteButton = styled.span`
  cursor: pointer;
  color: #8e8e8e;
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      status
      error
    }
  }
`;

interface IComment {
  key?: number;
  photoId?: number;
  id?: number;
  author: string;
  payload: string;
  isMine?: boolean;
}

const Comment: React.FC<IComment> = ({
  photoId,
  id,
  author,
  payload,
  isMine,
}) => {
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: (cache, result) => {
      const {
        data: {
          deleteComment: { status },
        },
      } = result;
      if (status) {
        cache.evict({ id: `Comment:${id}` });
      }
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    },
  });

  const onClickDelete = () => {
    console.log('CLICK CLICK CLICK');
    deleteCommentMutation();
  };

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
        {isMine ? (
          <DeleteButton onClick={onClickDelete}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </DeleteButton>
        ) : null}
      </CommentLine>
    </Container>
  );
};

export default Comment;
