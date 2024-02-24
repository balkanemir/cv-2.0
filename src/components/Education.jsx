import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import EducationData from "../Education.json";

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

const OpacityAnimation = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity:1
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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

const SubContainer = styled.div`
  width: 100vw;
  height: 20%;
  display: flex;
  position: relative;
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

const CardContainerWrapper = styled.div`
  width: 100vw;
  height: 80%;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const CardContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  transition: 0.2s all;
  @media (max-width: 1050px) {
    width: auto;
  }
`;

const CardWrapper = styled.div`
  width: 40%;
  height: 90%;
  position: relative;
  @media (max-width: 1050px) {
    width: 80vw;
    margin: 0 10vw;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  transform: ${(props) =>
    props.isHovered
      ? "perspective(4000px) rotateY(180deg)"
      : "perspective(4000px) rotateY(0deg)"};

  background-color: ${(props) => (props.isHovered ? props.bgColor : "white")};
  transition: 1s all;
  display: flex;
  overflow: hidden;
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${(props) =>
    props.isHovered
      ? "perspective(3000px) rotateY(180deg)"
      : "perspective(3000px) rotateY(0deg)"};
  opacity: 0;
  animation: ${OpacityAnimation} 1s ease forwards;
  animation-delay: 0.5s;
  font-family: "Futura";
  color: white;
`;

const Logo = styled.img`
  width: auto;
  height: 20%;
`;

const Website = styled.a`
  width: 80px;
  height: 30px;
  position: absolute;
  left: 20px;
  top: 155px;
  border: 2px solid white;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  transition: 0.2s all;
  &:hover {
    background-color: white;
    color: ${(props) => props.color};
  }
  @media (max-width: 650px) {
    top: 165px;
  }
`;
const Rank = styled.a`
  width: 80px;
  height: 30px;
  position: absolute;
  left: 120px;
  top: 155px;
  border: 2px solid white;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  transition: 0.2s all;
  &:hover {
    background-color: white;
    color: ${(props) => props.color};
  }
  @media (max-width: 650px) {
    top: 165px;
  }
`;
const Name = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  font-size: 30px;
  @media (max-width: 1050px) {
    font-size: 30px;
  }
  @media (max-width: 650px) {
    font-size: 26px;
  }
`;
const Location = styled.div`
  position: absolute;
  left: 20px;
  top: 65px;
  @media (max-width: 650px) {
    left: 20px;
    top: 60px;
  }
`;

const Major = styled.div`
  position: absolute;
  left: 20px;
  top: 90px;
  font-size: 16px;
  @media (max-width: 650px) {
    font-size: 14px;
    top: 90px;
  }
`;
const Date = styled.div`
  position: absolute;
  left: 20px;
  top: 120px;
  font-size: 14px;
  @media (max-width: 650px) {
    font-size: 12px;
    top: 135px;
  }
`;

const CoursesContainer = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 250px);
  position: absolute;
  left: 20px;
  top: 230px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @media (max-width: 650px) {
    top: 240px;
  }
`;

const Title = styled.div`
  position: absolute;
  left: 20px;
  top: 200px;
  font-size: 20px;
  text-decoration: underline;
  @media (max-width: 650px) {
    font-size: 16px;
    top: 210px;
  }
`;

const Course = styled.div`
  width: 100%;
  height: auto;
  padding: 2px;
  box-sizing: border-box;
  @media (max-width: 650px) {
    font-size: 14px;
  }
`;

const PageDotsContainer = styled.div`
  width: 20px;
  height: auto;
  position: absolute;
  left: 50%;
  bottom: 15px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media (min-width: 1050px) {
    display: none;
  }
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: ${(props) => (props.bgColor ? "gray" : "lightgray")};
`;

const Background = styled.img`
  width: auto;
  height: 100%;
  position: absolute;
  z-index: -2;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #00000082;
  z-index: -1;
`;

const Education = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const themeColors = useSelector((state) => state.theme.themeColors).split(
    ","
  );
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const getLength = () => {
    const lengthItems = EducationData.universities.length;
    return lengthItems;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const offsetX = e.clientX - startX;

    setDragOffset(offsetX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset < -190) {
      console.log("here");
      const lengthItems = getLength();
      setSlideIndex((prevIndex) =>
        prevIndex === lengthItems - 1 ? prevIndex : prevIndex + 1
      );
    }
    if (dragOffset > -190) {
      console.log("aha");
      console.log(dragOffset);
      setSlideIndex((prevIndex) =>
        prevIndex === 0
          ? prevIndex
          : dragOffset === 0
          ? prevIndex
          : prevIndex - 1
      );
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const offsetX = e.touches[0].clientX - startX;
    setDragOffset(offsetX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -190) {
      const lengthItems = getLength();
      setSlideIndex((prevIndex) =>
        prevIndex === lengthItems - 1 ? prevIndex : prevIndex + 1
      );
    }

    if (dragOffset > -190) {
      setSlideIndex((prevIndex) =>
        prevIndex === 0
          ? prevIndex
          : dragOffset === 0
          ? prevIndex
          : prevIndex - 1
      );
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const handleDotClick = (idx) => {
    setSlideIndex(idx);
  };

  const handleHover = (idx) => {
    setIsHovered(idx);
  };
  return (
    <Container ref={ref}>
      <SubContainer>
        {inView && (
          <>
            <MainTitle color={themeColors[0]}>Education.</MainTitle>
            <Content color={themeColors[0]}>This is where i learn.</Content>
          </>
        )}
      </SubContainer>
      <CardContainerWrapper
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CardContainer
          slideIndex={slideIndex}
          dragOffset={dragOffset}
          style={{
            transform: `translateX(
  calc(${slideIndex} * -100vw + ${dragOffset}px)`,
          }}
        >
          {EducationData.universities.map((item, idx) => (
            <CardWrapper
              onMouseEnter={() => handleHover(idx)}
              onMouseLeave={() => handleHover(null)}
            >
              <Card
                isHovered={isHovered === idx}
                bgColor={item.backgroundColor}
              >
                {isHovered !== idx && (
                  <CardContent isHovered={isHovered === idx}>
                    <Logo src={item.logo} />
                    <Background src={item.background} />
                    <Overlay></Overlay>
                  </CardContent>
                )}
                {isHovered === idx && (
                  <CardContent
                    isHovered={isHovered === idx}
                    bgColor={item.backgroundColor}
                  >
                    <Name>{item.name}</Name>
                    <Rank
                      href={item.rank}
                      target="_blank"
                      color={item.backgroundColor}
                    >
                      Rank
                    </Rank>
                    <Website
                      href={item.website}
                      target="_blank"
                      color={item.backgroundColor}
                    >
                      Website
                    </Website>
                    <Location>{item.location}</Location>
                    <Major>
                      {" "}
                      {item.degree} / {item.major}
                    </Major>
                    <Date>{item.date}</Date>
                    <Title>Taken CS Courses:</Title>
                    <CoursesContainer>
                      {item.courses.map((course) => (
                        <Course>{course}</Course>
                      ))}
                    </CoursesContainer>
                  </CardContent>
                )}
              </Card>
            </CardWrapper>
          ))}
        </CardContainer>
        <PageDotsContainer>
          {EducationData.universities.map((item, idx) => (
            <Dot
              onClick={() => handleDotClick(idx)}
              bgColor={slideIndex === idx}
            ></Dot>
          ))}
        </PageDotsContainer>
      </CardContainerWrapper>
    </Container>
  );
};

export default Education;
