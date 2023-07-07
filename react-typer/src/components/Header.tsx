import React from "react";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  color: white;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Heading = styled.h1`
  margin: 20px 0 30px;
`;

const SubHeading = styled.h2``;

const Header: React.FC = () => {
  return (
    <Container>
      <SubHeading>React</SubHeading>
      <Heading>Coding Speed Test</Heading>
    </Container>
  );
};

export default Header;
