import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { logUserOut } from '../apollo';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';
import Photo from '../components/feed/Photo';
import PageTitle from '../components/PageTitle';
import {
  seeFeeds_seeFeeds_user,
  seeFeeds_seeFeeds_comments_user,
} from '../__generated__/seeFeeds';

const FEED_QUERY = gql`
  query seeFeed($offset: Int) {
    seeFeed(offset: $offset) {
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
  const { data, fetchMore } = useQuery<IFeeds>(FEED_QUERY, {
    variables: {
      offset: 0,
    },
    onCompleted: (data) => {
      console.log(`Home / useQuery / onCompleted`);
      console.log(data);
    },
    onError: (e) => {
      console.log(`Home / useQuery / onError`);
      console.log(e);
    },
  });

  useEffect(() => {
    const handleScroll = (e: any) => {
      // console.log(`Header / handleScroll`);
      // console.log(e);
      // const bottom =
      //   e.currentTarget.scrollHeight - e.currentTarget.scrollTop >=
      //   e.currentTarget.scrollHeight;

      const diff =
        e.target.scrollingElement.offsetHeight -
        e.target.scrollingElement.scrollTop;

      const bottom =
        e.target.scrollingElement.offsetHeight <=
        e.target.scrollingElement.clientHeight +
          e.target.scrollingElement.scrollTop +
          10;

      console.log(
        e.target.scrollingElement.clientHeight,
        e.target.scrollingElement.scrollHeight,
        e.target.scrollingElement.scrollTop,
        e.target.scrollingElement.offsetHeight,
        bottom,
        diff,
      );
      if (bottom) {
        // console.log('At The Bottom@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'); //Add in what you want here
        // console.log(data?.seeFeed?.length);
        fetchMore({
          variables: {
            offset: data?.seeFeed.length,
          },
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data, fetchMore]);

  return (
    <>
      <PageTitle title="Home" />
      <div>
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
      </div>
      <button onClick={() => logUserOut()}>Logout</button>
    </>
  );
};
export default Home;
