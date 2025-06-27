import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg,rgb(227, 251, 253) 0%,rgb(166, 198, 254) 100%);
  padding: 1rem;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color:rgb(0, 0, 0);
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
  text-align: center;
  @media (max-width: 480px) {
    font-size: 2rem;
  }
  @media (max-width: 340px) {
    font-size: 1.5rem;
  }
`; 

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  color:rgb(0, 0, 0);
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  text-align: center;
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 340px) {
    font-size: 1rem;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 0 1rem;
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  color: rgb(0, 0, 0);
  background:rgb(255, 220, 19);
  border: none;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 400;
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.15);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background:rgb(255, 230, 19);
    transform: translateY(-2px) scale(1.03);
  }
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
    margin: 0 0.5rem;
  }
  @media (max-width: 340px) {
    font-size: 0.95rem;
    padding: 0.5rem 0.7rem;
  }
`;


const Home = () => {
  return (
    <Wrapper>
      <Title>✨ Welcome to Happy Thoughts ✨</Title>
      <Subtitle>Please register or log in to start using the app 😊</Subtitle>
      <div>
        <StyledLink to="/register">Register</StyledLink>
        <StyledLink to="/login">Log In</StyledLink>
      </div>
    </Wrapper>
  );
};

export default Home;