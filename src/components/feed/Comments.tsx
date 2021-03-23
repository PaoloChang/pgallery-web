import React from 'react';
import styled from 'styled-components';
import { seeFeeds_seeFeeds_comments_user } from '../../__generated__/seeFeeds';
import Comment from './Comment';

const Container = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  display: block;
  opacity: 0.7;
  margin: 10px 0;
  font-weight: 700;
  font-size: 12px;
`;

interface IComments {
  author: string;
  caption: string;
  commentNumber: number;
  comments: Array<{
    id: number;
    user: seeFeeds_seeFeeds_comments_user;
    payload: string;
  }>;
}

const Comments: React.FC<IComments> = ({
  author,
  caption,
  commentNumber,
  comments,
}) => {
  return (
    <Container>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? '1 comment' : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
    </Container>
  );
};

export default Comments;
