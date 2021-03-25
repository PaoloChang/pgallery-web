import { useLocation, useParams } from 'react-router-dom';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { PHOTO_FRAGMENT } from '../fragments';

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMine
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

// interface IProfile {}

interface IParams {
  username: string;
}

const Profile: React.FC = () => {
  const location = useLocation();
  const { username } = useParams<IParams>();
  console.log(location, username);

  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  console.log(data);

  return <div>Profile</div>;
};

export default Profile;
