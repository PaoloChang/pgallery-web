import { gql, useQuery } from '@apollo/client';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { logUserOut } from '../apollo';
import Avatar from '../components/Avatar';
import { FatText } from '../components/shared';
import { seeFeed } from '../__generated__/seeFeed';

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      image
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

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
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 10px;
`;

const Home: React.FC = () => {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  return (
    <div>
      {data?.seeFeed?.map((photo) => (
        <PhotoContainer key={photo?.id}>
          <PhotoHeader>
            <Avatar
              url={photo?.user?.avatar ? photo.user.avatar : ''}
              lg={true}
            />
            <Username>{photo?.user.username}</Username>
          </PhotoHeader>
          <PhotoImage
            alt={photo?.id ? photo?.id.toString() : ''}
            src={photo?.image ? photo?.image : ''}
          />
          <PhotoData>
            <PhotoActionControl>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon
                    style={{ color: photo?.isLiked ? 'tomato' : 'inherit' }}
                    icon={photo?.isLiked ? SolidHeart : faHeart}
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
            <Likes>
              {photo?.likes === 1 ? '1 like' : `${photo?.likes} likes`}
            </Likes>
            {photo?.caption}
          </PhotoData>
        </PhotoContainer>
      ))}
      <button onClick={() => logUserOut()}>Logout</button>
    </div>
  );
};
export default Home;
