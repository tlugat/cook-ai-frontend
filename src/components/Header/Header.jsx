import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <StyledLink to="/">Accueil</StyledLink>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; 
  top: 0; 
  width: 100%; 
  z-index: 100; 
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin-right: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

export default Header;
