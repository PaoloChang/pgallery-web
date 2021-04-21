import { gql, useQuery } from '@apollo/client';
import { AnyARecord } from 'node:dns';
import { useEffect, useRef } from 'react';
import { logUserOut } from '../apollo';
import Photo from '../components/feed/Photo';
import PageTitle from '../components/PageTitle';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';
import {
  seeFeeds_seeFeeds_user,
  seeFeeds_seeFeeds_comments_user,
} from '../__generated__/seeFeeds';

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

interface IFeed {
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

interface IFeeds {
  seeFeed: IFeed[];
}

const Home: React.FC = () => {
  const { data, fetchMore } = useQuery<IFeeds>(FEED_QUERY);
  //   const feed = data?.seeFeed;
  const feedRef = useRef<null | HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.scrollHeight;

    console.log(e.currentTarget.scrollHeight);
    if (bottom) {
      console.log('At The Bottom'); //Add in what you want here
    }
  };

  useEffect(() => {
    if (
      feedRef.current?.scrollIntoView({
        inline: 'end',
      })
    ) {
      console.log('END OF SCREEN');
    }
  }, [feedRef]);

  return (
    <>
      <PageTitle title="Home" />
      <div
        // ref={feedRef}
        onScroll={() => console.log('Scrolling')}
      >
        {data &&
          data.seeFeed?.map((photo) => (
            <Photo
              key={photo.id}
              id={photo.id}
              user={photo.user}
              image={photo.image}
              isLiked={photo.isLiked}
              likes={photo.likes}
              caption={photo.caption}
              commentNumber={photo.commentNumber}
              comments={photo.comments}
            />
          ))}
        <button onClick={() => logUserOut()}>Logout</button>
      </div>
    </>
  );
};
export default Home;
