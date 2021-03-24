import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import { seeFeeds_seeFeeds_comments_user } from '../../__generated__/seeFeeds';
import { Separator } from '../shared';
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
  width: 98%;
  padding: 6px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  &:focus {
    box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.01),
      0px 0px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      status
      id
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
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [createCommentMutaton, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: (cache, response) => {
        const { payload } = getValues();
        setValue('payload', '');
        let newComment = {};
        const {
          data: {
            createComment: { status, id },
          },
        } = response;
        if (status && userData?.seeMe) {
          newComment = {
            id,
            __typename: 'Comment',
            createAt: Date.now(),
            payload,
            isMine: true,
            user: {
              ...userData.seeMe,
            },
          };
        }
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            comments(prev) {
              return [...prev, newComment];
            },
            commentNumber(prev) {
              return prev + 1;
            },
          },
        });
      },
    },
  );

  const onValid = (data: any) => {
    const { payload } = data;
    if (loading) return;
    createCommentMutaton({
      variables: {
        photoId,
        payload,
      },
    });
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
      <Separator />
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
