import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import ProjectsData from "../Projects.json";

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

const SlideAnimation = keyframes`
  from {
    top: 200px;
  }

  to {
    top: 0;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
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

const ProjectsContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  position: relative;
  overflow-x: scroll;
`;

const Project = styled.div`
  width: ${(props) => (props.isClicked ? "60%" : `450px`)};
  height: ${(props) => (props.isClicked ? "80%" : "100%")};
  background-color: white;
  position: ${(props) => (props.isClicked ? "fixed" : "absolute")};
  top: ${(props) => (props.isClicked ? "50%" : "0")};
  left: ${(props) =>
    props.isClicked
      ? "50%"
      : props.slide
      ? props.start
        ? `calc(${props.index} * 150px)`
        : `calc(${props.index} * 170px)`
      : `calc(${props.index} * 150px)`};
  transform: ${(props) =>
    props.isClicked
      ? "rotate(0) scale(1) translate(-50%, -50%)"
      : props.isHovered
      ? "rotate(0) scale(0.9)"
      : "perspective(1500px) rotateY(60deg) scale(0.7)"};
  transition: all 0.5s;
  animation: ${SlideAnimation} 1s ease;
  z-index: ${(props) =>
    props.isClicked ? "99" : props.isHovered ? "99" : props.index};
  pointer-events: ${(props) =>
    props.start ? (props.isClicked ? "auto" : "none") : "auto"};
  box-shadow: ${(props) =>
    !props.start ? "none" : props.isClicked ? "0 0 5px 1px lightgray" : "none"};
  filter: ${(props) =>
    !props.start ? "none" : props.isClicked ? "none" : "blur(5px)"};
  cursor: pointer;
  overflow-y: auto;
  @media (max-width: 650px) {
    width: ${(props) => (props.isClicked ? "100%" : `450px`)};
    height: ${(props) => (props.isClicked ? "100%" : "100%")};
  }
`;

const Cover = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (!props.start ? "1" : props.isClicked ? "0" : "1")};
  transition: 0.5s all;
  border: none;
`;

const CoverName = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-family: "Futura";
  font-weight: 700;
  font-size: 60px;
  color: white;
  z-index: 1;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid;
  border-color: ${(props) => props.color};
  color: ${(props) => props.color};
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  background-color: transparent;
`;

const Overlay = styled.div`
  width: 100%;
  height: 20%;
  background: linear-gradient(to bottom, transparent, white);
  transform: translateY(-99%);
`;

const InfoContainer = styled.div`
  width: 100%;
  height: auto;
  color: #80808092;
  font-family: "Futura";
  font-weight: 700;
  font-size: 10px;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
  line-height: 20px;
  transform: translateY(-50%);
`;

const ScreenShootContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  font-family: "Futura";
`;

const ScreenShoot = styled.img`
  width: 100%;
  height: auto;
  margin: 20px 0 20px 0;
`;

const Portfolio = () => {
  const [isClicked, setIsClicked] = useState(null);
  const [isHovered, setIsHovered] = useState(ProjectsData.projects.length);
  const themeColors = useSelector((state) => state.theme.themeColors).split(
    ","
  );

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [projectRef, projectInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const handleProjectClick = (idx) => {
    setIsClicked(idx);
    setIsHovered(ProjectsData.projects.length);
  };

  const handleProjectHover = (hover) => {
    setIsHovered(hover);
  };

  useEffect(() => {
    setIsClicked(null);
  }, [inView]);

  return (
    <Container ref={ref}>
      <SubContainer>
        {inView && (
          <>
            <MainTitle color={themeColors[0]}>Portfolio.</MainTitle>
            <Content color={themeColors[0]}>This is what i built.</Content>
          </>
        )}
      </SubContainer>

      <ProjectsContainer
        length={ProjectsData.projects.length}
        isClicked={isClicked}
        ref={projectRef}
      >
        {projectInView &&
          ProjectsData.projects.map((project, idx) => (
            <Project
              onClick={() => {
                if (!isClicked && isClicked !== 0) {
                  handleProjectClick(idx);
                }
              }}
              key={idx}
              index={idx}
              length={ProjectsData.projects.length}
              start={isClicked !== null}
              isClicked={isClicked === idx}
              onMouseEnter={() => handleProjectHover(idx)}
              onMouseLeave={() =>
                handleProjectHover(ProjectsData.projects.length)
              }
              isHovered={isHovered === idx}
              slide={idx > isHovered}
            >
              {isClicked === idx && (
                <>
                  <CloseButton
                    onClick={() => handleProjectClick(null)}
                    color={themeColors[5]}
                  >
                    <i className="bi bi-x-lg"></i>
                  </CloseButton>
                  <video width="100%" height="auto" constrols autoPlay loop>
                    <source src={project.video} type="video/mp4" />
                  </video>
                  <Overlay></Overlay>
                  <InfoContainer>
                    <b style={{ color: themeColors[0], fontSize: "20px" }}>
                      {project.name}
                    </b>{" "}
                    <br />
                    <b style={{ color: themeColors[0] }}>Dates:</b>{" "}
                    {project.dates} <br />
                    <b style={{ color: themeColors[0] }}>Demander:</b>{" "}
                    {project.demander} <br />
                    <b style={{ color: themeColors[0] }}>Description:</b>{" "}
                    {project.description} <br />
                    <b style={{ color: themeColors[0] }}>
                      Technologies & Libraries:
                    </b>{" "}
                    {project.usedTechnologies} <br />
                    <b style={{ color: themeColors[0] }}>Github Link:</b>{" "}
                    {project.githubLink} <br />
                    <b style={{ color: themeColors[0] }}>Website Link:</b>{" "}
                    {project.websiteLink} <br />
                  </InfoContainer>
                  <ScreenShootContainer>
                    {project.screenshots.length !== 0 && (
                      <b
                        style={{
                          color: themeColors[0],
                          fontSize: "16px",
                          marginLeft: "20px",
                        }}
                      >
                        Screenshoots
                      </b>
                    )}
                    {project.screenshots.map((screenshot) => (
                      <ScreenShoot src={screenshot} />
                    ))}
                  </ScreenShootContainer>
                </>
              )}

              <Cover
                start={isClicked !== null}
                isClicked={isClicked === idx}
                src={project.cover}
              />
              {isClicked !== idx && <CoverName>{project.name}</CoverName>}
            </Project>
          ))}
      </ProjectsContainer>
    </Container>
  );
};

export default Portfolio;
