import React from "react";
import Intro from "../components/Intro";
import styled from "styled-components";
import MindSet from "../components/MindSet";
import Navbar from "../components/Navbar";
import SkillSet from "../components/SkillSet";
import Portfolio from "../components/Portfolio";
import Experience from "../components/Experience";
import Education from "../components/Education";

const Container = styled.div`
  width: calc(100vw);
  height: auto;
`;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Intro />
      <MindSet />
      <SkillSet />
      <Portfolio />
      <Experience />
      <Education />
    </Container>
  );
};

export default Home;
