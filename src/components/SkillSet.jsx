import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import skillsetData from "../Skillset.json";

const SlideAnimation = keyframes`
  from {
    left: calc(100vw + 300px);
  }

  to {
    left: -300px;
  }
`;

const SlideAnimationSmallScreen = keyframes`
  from {
    left: calc(100vw + 1000px);
  }

  to {
    left: -1000px;
  }
`;

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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const SubContainer = styled.div`
  width: 100vw;
  height: 20%;
  display: flex;
  position: relative;
`;

const ItemContainer = styled.div`
  width: 200px;
  border: 1px solid black;
  height: 100%;
  position: absolute;
  left: calc(100vw + 10%);
  animation: ${(props) =>
    css`
      ${SlideAnimation} ${props.duration}s linear ${props.delay}s infinite
    `};
  filter: grayscale();
  transition: 0.5s all;
  transform: scale(0.5);
  animation-play-state: ${(props) => (props.stop ? "paused" : "running")};
  user-select: none;
  display: flex;
  &:hover {
    filter: none;
    transform: scale(0.7);
  }
  @media (max-width: 1050px) {
    animation: ${(props) =>
      css`
        ${SlideAnimationSmallScreen} ${props.duration}s linear ${props.delay}s infinite
      `};
    animation-play-state: ${(props) => (props.stop ? "paused" : "running")};
  }
`;

const Item = styled.img`
  width: auto;
  height: 100%;
  transition: all 0.5s;
`;

const ItemDescriptionContainer = styled.div`
  width: ${(props) => (props.visible ? "100px" : "100px")};
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  opacity: ${(props) => (props.visible ? "1" : "0")};
  margin-left: 10px;
  transition: 0.5s all;
`;

const Title = styled.div`
  width: 100px;
  height: auto;
  font-weight: 700;
  font-size: 20px;
  font-family: "Futura";
`;

const Description = styled.div`
  width: 100px;
  height: auto;
  align-items: center;
  font-size: 16px;
  font-family: "Montserrat";
`;

const MainTitle = styled.div`
  font-size: 52px;
  font-family: "Futura";
  font-weight: 700;
  color: ${(props) => props.color};
  position: absolute;
  top: 50px;
  left: 50px;
  opacity: 0;
  animation: ${FadeInAnimation} ease forwards 1s;
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

const Content = styled.div`
  font-size: 22px;
  font-family: "Futura";
  font-weight: 700;
  color: ${(props) => props.color};
  position: absolute;
  top: 120px;
  left: 50px;
  opacity: 0;
  animation: ${FadeInAnimation} ease forwards 1s;
  @media (max-width: 1050px) {
    left: 50%;
    animation: ${FadeInAnimationSmallScreen} ease forwards 1s;
    animation-delay: 1s;
    font-size: 14px;
    text-align: center;
  }
  @media (max-width: 650px) {
    animation-delay: 0s;
  }
`;

const SectionTitle = styled.div`
  font-size: 52px;
  font-family: "Futura";
  font-weight: 700;
  color: black;
  position: absolute;
  top: 50px;
  left: 50px;
  opacity: ${(props) => (props.visible ? "0.2" : "0")};
  transition: 0.5s all;
  user-select: none;
  @media (max-width: 1050px) {
    font-size: 42px;
  }
  @media (max-width: 650px) {
    font-size: 32px;
  }
  @media (max-width: 425px) {
    font-size: 22px;
  }
`;

const SkillSet = () => {
  const [stop, setStop] = useState("");
  const [description, setDescription] = useState("");
  const themeColors = useSelector((state) => state.theme.themeColors).split(
    ","
  );

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const handleStop = (status, name) => {
    setStop(status);
    setDescription(name);
  };
  return (
    <Container ref={ref}>
      <SubContainer>
        {inView && (
          <>
            <MainTitle color={themeColors[0]}>Skillset.</MainTitle>
            <Content color={themeColors[0]}>
              This is all what i know & still learning.
            </Content>
          </>
        )}
      </SubContainer>
      <SubContainer>
        <SectionTitle visible={stop !== "PL"}>
          Programming Languages.
        </SectionTitle>
        {skillsetData.PL.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <ItemContainer
              stop={stop === "PL"}
              duration={skillsetData.PL.items.length * 4}
              delay={idx * 4}
            >
              <Item
                src={item.src}
                onMouseEnter={() => handleStop("PL", item.name)}
                onMouseLeave={() => handleStop("", "")}
              />

              <ItemDescriptionContainer visible={description === item.name}>
                <Title>{item.name}</Title>
                <Description> {item.description}</Description>
              </ItemDescriptionContainer>
            </ItemContainer>
          </React.Fragment>
        ))}
      </SubContainer>
      <SubContainer>
        <SectionTitle visible={stop !== "FW"}>Frameworks.</SectionTitle>
        {skillsetData.FW.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <ItemContainer
              stop={stop === "FW"}
              duration={skillsetData.FW.items.length * 3}
              delay={idx * 3}
            >
              <Item
                src={item.src}
                onMouseEnter={() => handleStop("FW", item.name)}
                onMouseLeave={() => handleStop("", "")}
              />

              <ItemDescriptionContainer visible={description === item.name}>
                <Title>{item.name}</Title>
                <Description> {item.description}</Description>
              </ItemDescriptionContainer>
            </ItemContainer>
          </React.Fragment>
        ))}
      </SubContainer>
      <SubContainer>
        <SectionTitle visible={stop !== "Tech"}>Technologies.</SectionTitle>
        {skillsetData.Tech.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <ItemContainer
              stop={stop === "Tech"}
              duration={skillsetData.Tech.items.length * 2}
              delay={idx * 2}
            >
              <Item
                src={item.src}
                onMouseEnter={() => handleStop("Tech", item.name)}
                onMouseLeave={() => handleStop("", "")}
              />

              <ItemDescriptionContainer visible={description === item.name}>
                <Title>{item.name}</Title>
                <Description> {item.description}</Description>
              </ItemDescriptionContainer>
            </ItemContainer>
          </React.Fragment>
        ))}
      </SubContainer>
      <SubContainer>
        <SectionTitle visible={stop !== "Languages"}>
          Languages: Turkish (N), English (C1).
        </SectionTitle>
      </SubContainer>
    </Container>
  );
};

export default SkillSet;
