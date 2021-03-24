import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { isLoggedInVar, logUserOut } from '../apollo';

const SEE_ME_QUERY = gql`
  query seeMe {
    seeMe {
      username
      avatar
    }
  }
`;

interface IUser {
  seeMe: {
    username: string;
    avatar: string;
  };
}

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<IUser>(SEE_ME_QUERY, {
    skip: !hasToken,
  });
  // console.log(data);
  useEffect(() => {
    if (data === undefined) return;
    if (data.seeMe === null) {
      // There is a token on localStorage but the token didn't work on the backend
      logUserOut();
    }
  }, [data]);
  return { data };
};

export default useUser;
