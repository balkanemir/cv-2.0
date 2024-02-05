import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

const FadeInAnimation = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const FadeInAnimationSmallScreen = keyframes`
  from {
    transform: translate(-50%, 100px);
    opacity: 0;
  }

  to {
    transform: translate(-50%, 0px);
    opacity: 1;
  }
`;

const GradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 50% 0%;
  }
  75% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Container = styled.div`
  width: calc(100vw - 15px);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 650px) {
    flex-direction: column;
    height: auto;
  }
  @media (max-width: 425px) {
  }
`;

const About = styled.div`
  width: 50vw;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  @media (max-width: 650px) {
    width: 100vw;
  }
  @media (max-width: 425px) {
  }
`;

const Mindset = styled.div`
  min-width: 50vw;
  height: 100vh;
  background: ${(props) => `-webkit-radial-gradient(${props.theme})`};
  background-size: 300% 300%;
  box-sizing: border-box;
  position: relative;
  animation: ${GradientAnimation} 60s linear infinite;
`;

const TitleLeft = styled.div`
  font-size: 52px;
  font-family: "Futura";
  font-weight: 700;
  color: ${(props) => props.themeColor};
  position: absolute;
  top: 50px;
  left: 50px;
  opacity: 0;
  animation: ${FadeInAnimation} ease forwards 1s;
  @media (max-width: 1050px) {
    left: 50%;
    animation: ${FadeInAnimationSmallScreen} ease forwards 1s;
    font-size: 42px;
  }
`;

const TitleRight = styled.div`
  font-size: 52px;
  font-family: "Futura";
  font-weight: 700;
  color: white;
  position: absolute;
  top: 50px;
  left: 50px;
  opacity: 0;
  animation: ${FadeInAnimation} ease forwards 1s;
  animation-delay: 1s;
  @media (max-width: 1050px) {
    left: 50%;
    animation: ${FadeInAnimationSmallScreen} ease forwards 1s;
    animation-delay: 1s;
    font-size: 42px;
  }
  @media (max-width: 650px) {
    animation-delay: 0s;
  }
`;

const ContentContainer = styled.div`
  width: calc(100% - 100px);
  height: auto;
  position: absolute;
  top: 150px;
  left: 50px;
  color: ${(props) => props.color};
  font-size: 16px;
  font-family: "Montserrat";
  font-weight: 600;
  line-height: 30px;
  opacity: 0;
  animation: ${FadeInAnimation} ease forwards 1s;
  animation-delay: ${(props) => props.delay}s;
  @media (max-width: 1050px) {
    font-size: 14px;
    width: calc(100% - 60px);
    left: 30px;
    text-align: center;
  }
  @media (max-width: 650px) {
    font-size: 12px;
  }
  @media (max-width: 425px) {
    font-size: 12px;
  }
`;

const MindSet = () => {
  const [scrollY, setScrollY] = useState(0);
  const themeColors = useSelector((state) => state.theme.themeColors).split(
    ","
  );
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [mindsetRef, mindsetInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Container>
      <About ref={aboutRef}>
        {aboutInView && (
          <>
            {" "}
            <TitleLeft themeColor={themeColors[0]}>About me.</TitleLeft>
            <ContentContainer color={"gray"} delay={0.3}>
              Hi. I'm Emir, 23 years old. <br />
              UI/UX Designer, and Frontend Developer. <br />
              Currently living in Istanbul, Turkey. <br />
              Studying in Sabancı University. <br />
              My major? Computer Science and Engineering.
              <br />
              Loves to read, learn, and travel. <br />
              Has a lovely family, good friends, and a pet.
              <small> Yes, I am a cat person.</small> <br />
              Lives simple, tries to be creative.
              <br />
              Pursues good vibes.
              <br />
              So, appreciated life.
            </ContentContainer>
          </>
        )}
      </About>
      <Mindset
        ref={mindsetRef}
        style={{
          width:
            window.innerWidth < 650 ? "100vw" : `calc(100vw - ${scrollY}px)`,
        }}
        theme={themeColors}
      >
        {mindsetInView && (
          <>
            {" "}
            <TitleRight>Mindset.</TitleRight>
            <ContentContainer
              color={"white"}
              delay={window.innerWidth < 650 ? 0.3 : 1.3}
            >
              I'm a human being who wants to become the best version of himself
              in life. To do that, I read, study, work and apply the useful
              information that i got to my life. The life is all about enjoying
              the process while solving problems at the end. Therefore, I always
              try to enjoy from my responsibilities and problems, and try to
              keep myself healthy both mentally and physically while doing it. I
              try to perform better in work and school every day to achieve
              high-quality life so that i can built high-quality products. I try
              to learn more, and stay humble about what i know. Because as some
              of you already know, we have no idea about what we do not know. So
              much things is waiting to be learnt. <br />
              <br />
              Here is my website, hope you enjoy. <br />
              Keep Scrolling.
            </ContentContainer>
          </>
        )}
      </Mindset>
    </Container>
  );
};

export default MindSet;
