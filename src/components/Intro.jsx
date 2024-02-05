import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import allColors from "../allColors";
import { changeTheme } from "../store/Slices/themeSlice";

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

const FadeInAnimation = keyframes`
  0% {
    transform: translate(-50%, calc( -50% + 100px));
    opacity: 0;
  }

  100% {
    transform:  translate(-50%, -50%);
    opacity: 1;
  }
`;

const scaleAnimaiton = keyframes`
0% {
  transform: scale(0);
}
70% {
  transform: scale(1.2);
}
100% {
  transform: scale(1);
}
`;

const jumpAnimation = keyframes`
  0% {
    transform: translate(-50%, 0);
  }
  30% {
    transform: translate(-50%, 0);
  }
  65% {
    transform: translate(-50%, 10px);
  }
  100% {
    transform: translate(-50%, 0);
  }
`;

const Container = styled.div`
  width: calc(100vw - 15px);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const IntroContainer = styled.div`
  width: calc(100vw - 62.5px);
  height: calc(100vh - 50px);
  background-color: white;
  position: relative;
`;

const Title = styled.div`
  width: auto;
  height: auto;
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => `-webkit-radial-gradient(${props.theme})`};
  background-size: 200% 200%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Futura";
  font-weight: 700;
  animation: ${GradientAnimation} 30s linear infinite,
    ${FadeInAnimation} 1s ease;
  z-index: 3;
`;

const SubTitle = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  color: gray;
  font-family: "Futura";
  font-weight: 700;
  animation: ${FadeInAnimation} 1s ease;
  @media (max-width: 1050px) {
    font-size: 24px;
  }
  @media (max-width: 650px) {
    font-size: 16px;
  }
  @media (max-width: 425px) {
    font-size: 12px;
  }
`;

const ThemeContainer = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  top: calc(50% + 100px);
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${FadeInAnimation} 1s ease;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ThemeButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 100%;
  background: ${(props) => `radial-gradient(${props.colors})`};
  background-size: 200% 200%;
  transform: scale(0);
  animation: ${GradientAnimation} 10s linear infinite,
    ${scaleAnimaiton} 1s ease forwards;
  animation-delay: ${(props) => props.delay}s;
  transition: all 0.2s;
  cursor: pointer;
  @media (max-width: 1050px) {
    margin: 10px;
  }
  @media (max-width: 650px) {
    width: 40px;
    height: 40px;
    margin: 10px;
  }
  @media (max-width: 425px) {
    width: 25px;
    height: 25px;
    margin: 10px;
  }
`;

const ScrollInfo = styled.div`
  width: 200px;
  height: 75px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  animation: ${jumpAnimation} 2s ease infinite;
`;

const ScrollInfoTitle = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 12px;
`;

const ArrowDown = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const Intro = () => {
  const [scrollY, setScrollY] = useState(0);
  const [index, setIndex] = useState(0);
  const themeColors = useSelector((state) => state.theme.themeColors);
  const responsiveValues = useSelector((state) => state.theme.responsiveValues);
  const dispatch = useDispatch();

  const handleScroll = () => {
    setScrollY(window.scrollY);
    if (window.scrollY > 100) {
      setIndex(2);
    }
  };

  const handleIndex = () => {
    setIndex(2);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const timeoutId = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : prevIndex));
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [dispatch]);

  return (
    <Container>
      <ScrollInfo
        style={{
          opacity: `calc(1 - ${scrollY / 200}`,
        }}
      >
        <ScrollInfoTitle>Scroll Down</ScrollInfoTitle>
        <ArrowDown>
          <i class="bi bi-chevron-double-down"></i>
        </ArrowDown>
      </ScrollInfo>
      <IntroContainer>
        {index === 0 && (
          <Title
            index={index}
            style={{
              top: `calc(max(30px, 50% - ${scrollY}px - ${responsiveValues[4]}px))`,
              fontSize: `${responsiveValues[0]}px`,
            }}
            theme={themeColors}
          >
            Welcome.
          </Title>
        )}
        {index === 1 && (
          <>
            <Title
              index={index}
              style={{
                top: `calc(max(30px, 50% - ${scrollY}px - ${responsiveValues[4]}px))`,
                fontSize: `${responsiveValues[1]}px`,
              }}
              theme={themeColors}
            >
              Before we start, why don't you choose your favourite color?
            </Title>
            <ThemeContainer>
              <ThemeButton
                onClick={() => {
                  dispatch(changeTheme(allColors["green"]));
                  handleIndex();
                }}
                delay={1}
                colors={allColors["green"]}
              ></ThemeButton>
              <ThemeButton
                onClick={() => {
                  dispatch(changeTheme(allColors["blue"]));
                  handleIndex();
                }}
                delay={1.2}
                colors={allColors["blue"]}
              ></ThemeButton>
              <ThemeButton
                onClick={() => {
                  dispatch(changeTheme(allColors["red"]));
                  handleIndex();
                }}
                delay={1.4}
                colors={allColors["red"]}
              ></ThemeButton>
              <ThemeButton
                onClick={() => {
                  dispatch(changeTheme(allColors["pink"]));
                  handleIndex();
                }}
                delay={1.6}
                colors={allColors["pink"]}
              ></ThemeButton>
              <ThemeButton
                onClick={() => {
                  dispatch(changeTheme(allColors["purple"]));
                  handleIndex();
                }}
                delay={1.8}
                colors={allColors["purple"]}
              ></ThemeButton>
            </ThemeContainer>
          </>
        )}
        {index === 2 && (
          <Title
            index={index}
            style={{
              top: `calc(max(30px, 50% - ${scrollY}px - ${responsiveValues[4]}px))`,
              fontSize: `calc(max(${responsiveValues[2]}px,${
                responsiveValues[3]
              }px - ${scrollY / 10}px))`,
            }}
            theme={themeColors}
          >
            Emir Balkan.
          </Title>
        )}
        {index === 2 && (
          <SubTitle
            style={{
              top: `calc(50% + ${scrollY / 10}px)`,
              opacity: `calc(1 - ${scrollY / 200}`,
            }}
            theme={themeColors}
          >
            A Frontend Developer.
          </SubTitle>
        )}
      </IntroContainer>
    </Container>
  );
};

export default Intro;
