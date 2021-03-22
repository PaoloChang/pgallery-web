import { gql, useQuery } from '@apollo/client';
import { logUserOut } from '../apollo';
import Photo from '../components/feed/Photo';
import PageTitle from '../components/PageTitle';
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

const Home: React.FC = () => {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  //   const feed = data?.seeFeed;
  return (
    <>
      <PageTitle title="Home" />
      <div>
        {data?.seeFeed?.map((photo) => (
          <Photo
            key={photo?.id}
            id={photo?.id}
            user={photo?.user}
            image={photo?.image}
            isLiked={photo?.isLiked}
            likes={photo?.likes}
            caption={photo?.caption}
          />
        ))}
        <button onClick={() => logUserOut()}>Logout</button>
      </div>
    </>
  );
};
export default Home;
