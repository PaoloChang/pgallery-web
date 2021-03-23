import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
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

const CommentForm = styled.form``;
const CommentInput = styled.input`
  width: 100%;
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      status
      error
    }
  }
`;

interface IComments {
  photoId: number;
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
  photoId,
  author,
  caption,
  commentNumber,
  comments,
}) => {
  const { register, handleSubmit, setValue } = useForm();

  const [createCommentMutaton, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
  );

  const onValid = (data: any) => {
    const { payload } = data;
    // console.log(`photoId: ${photoId}, payload: ${payload}`);
    if (loading) return;
    createCommentMutaton({
      variables: {
        photoId,
        payload,
      },
    });
    setValue('payload', '');
  };

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
      <CommentForm action="" onSubmit={handleSubmit(onValid)}>
        <CommentInput
          name="payload"
          ref={register({ required: true })}
          type="text"
          placeholder="Write a comment..."
        />
      </CommentForm>
    </Container>
  );
};

export default Comments;
