import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { FatText } from '../shared';
import {
  seeFeeds_seeFeeds_user,
  seeFeeds_seeFeeds_comments_user,
} from '../../__generated__/seeFeeds';
import { gql, useMutation } from '@apollo/client';
import Comments from './Comments';
import { Link } from 'react-router-dom';

const PhotoContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  font-size: 16px;
  margin-left: 15px;
`;

const PhotoImage = styled.img`
  border-color: ${(props) => props.theme.borderColor};
  max-width: 610px;
  min-width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActionControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 30px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 10px;
`;

interface IPhoto {
  id: number;
  user: seeFeeds_seeFeeds_user;
  image: string;
  isLiked: boolean;
  likes: number;
  caption: string;
  commentNumber: number;
  comments: Array<{
    id: number;
    user: seeFeeds_seeFeeds_comments_user;
    payload: string;
    isMine: boolean;
  }>;
}

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      status
      error
    }
  }
`;

const Photo: React.FC<IPhoto> = ({
  id,
  user,
  image,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}) => {
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { status },
      },
    } = result;

    if (status) {
      const photoId = `Photo:${id}`;
      // const fragment = gql`
      //   fragment UPDATE_TOGGLE_LIKE on Photo {
      //     isLiked
      //     likes
      //   }
      // `;

      // const readResult = cache.readFragment({
      //   id: photoId,
      //   fragment: fragment,
      // });

      // if ('isLiked' in readResult && 'likes' in readResult) {
      //   const { isLiked: cacheIsLiked, likes: cacheLikes } = readResult;
      //   cache.writeFragment({
      //     id: photoId,
      //     fragment: fragment,
      //     data: {
      //       isLiked: !cacheIsLiked,
      //       likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
      //     },
      //   });
      // }

      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev: boolean) {
            return !prev;
          },
          likes(prev: number) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/user/${user.username}`}>
          <Avatar url={user?.avatar ? user.avatar : ''} lg={true} />
        </Link>
        <Link to={`/user/${user.username}`}>
          <Username>{user.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoImage alt={id.toString()} src={image} />
      <PhotoData>
        <PhotoActionControl>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? 'tomato' : 'inherit' }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActionControl>
        <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          author={user.username}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
