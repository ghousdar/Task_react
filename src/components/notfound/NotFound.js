import styled from "styled-components";
const NotFound = () => {
  return (
    <Container>
      <h2>404</h2>
      <p>Page not found</p>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 0.5rem;
  }
`;
