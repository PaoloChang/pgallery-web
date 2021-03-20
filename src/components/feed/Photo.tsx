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
import { seeFeed_seeFeed_user } from '../../__generated__/seeFeed';
import { gql, useMutation } from '@apollo/client';

const PhotoContainer = styled.div`
  background-color: white;
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
  id: number | undefined;
  user: seeFeed_seeFeed_user | undefined;
  image: string | undefined;
  isLiked: boolean | undefined;
  likes: number | undefined;
  caption: string | null | undefined;
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
}) => {
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
  });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar url={user?.avatar ? user.avatar : ''} lg={true} />
        <Username>{user?.username}</Username>
      </PhotoHeader>
      <PhotoImage alt={id ? id.toString() : ''} src={image ? image : ''} />
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
        {caption}
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
