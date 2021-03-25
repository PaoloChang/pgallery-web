import { useReactiveVar } from '@apollo/client';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedInVar } from '../apollo';
import useUser from '../hooks/useUser';
import routes from '../routes';
import Avatar from './Avatar';

const StyledHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

// const Mistery = styled.div`
//     background-color: ${(props) => props.theme.accent};
//     border-radius: 4px;
//     padding: 3px 15px;
//     color: white;
//     font-weight: 600;
// `;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 3px 15px;
  color: white;
  font-weight: 600;
`;

const Header: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <StyledHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <FontAwesomeIcon icon={faHome} size="2x" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="2x" />
              </Icon>
              <Icon>
                <Link to={`/user/${data?.seeMe.username}`}>
                  <Avatar
                    url={data?.seeMe?.avatar ? data?.seeMe?.avatar : ''}
                    lg={false}
                  />
                </Link>
              </Icon>
            </IconsContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </StyledHeader>
  );
};

export default Header;
