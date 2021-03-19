import styled from "styled-components";

const StyledAvatar = styled.div`
    width: 27px;
    height: 27px;
    border-radius: 15px;
    background-color: #2c2c2c;
    overflow: hidden;
`;

const Img = styled.img`
    max-width: 100%;
`;

interface IAvatar {
    url: string
}

const Avatar: React.FC<IAvatar> = ({ url }) => {
    return (
        <StyledAvatar>
            { url !== "" ? <Img alt="me" src={url} /> : null }
        </StyledAvatar>
    )
}

export default Avatar;