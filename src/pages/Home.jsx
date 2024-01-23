import React from "react";
import Intro from "../components/Intro";
import styled from "styled-components";
import MindSet from "../components/MindSet";
import Navbar from "../components/Navbar";
import SkillSet from "../components/SkillSet";

const Container = styled.div`
  width: calc(100vw - 15px);
  height: auto;
`;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Intro />
      <MindSet />
      <SkillSet />
    </Container>
  );
};

export default Home;