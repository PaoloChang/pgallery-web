import styled from 'styled-components';

interface IStyledAvatar {
  lg: boolean;
}

const StyledAvatar = styled.div<IStyledAvatar>`
  width: ${(props) => (props.lg ? '35px' : '27px')};
  height: ${(props) => (props.lg ? '35px' : '27px')};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

interface IAvatar {
  url: string;
  lg: boolean;
}

const Avatar: React.FC<IAvatar> = ({ url, lg = false }) => {
  return (
    <StyledAvatar lg={lg}>
      {url !== '' ? <Img alt="me" src={url} /> : null}
    </StyledAvatar>
  );
};

export default Avatar;
