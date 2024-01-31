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
  width: 450px;
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  left: ${(props) =>
    props.projectClicked
      ? `calc(${props.index} * 150px)`
      : props.slide
      ? `calc(${props.index} * 170px)`
      : `calc(${props.index} * 150px)`};
  transform: ${(props) =>
    props.isHovered
      ? "rotate(0) scale(0.9)"
      : "perspective(1500px) rotateY(60deg) scale(0.7)"};
  transition: all 0.5s;
  animation: ${SlideAnimation} 1s ease;
  pointer-events: ${(props) => (props.projectClicked ? "none" : "auto")};
  z-index: ${(props) => (props.isHovered ? "99" : props.index)};
  cursor: pointer;
  overflow-y: auto;
`;

const DetailedProjectContainer = styled.div`
  width: 70vw;
  height: 80vh;
  position: fixed;
  top: 10vh;
  left: 15vw;
  background-color: white;
  box-shadow: 0 0 5px 1px lightgray;
  overflow-y: auto;
  z-index: 99;
  animation: ${FadeInAnimation} 0.5s ease;
  @media (max-width: 650px) {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
`;

const Cover = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  z-index: -1;
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
  const [isHovered, setIsHovered] = useState(ProjectsData.projects.length);
  const themeColors = useSelector((state) => state.theme.themeColors).split(
    ","
  );
  const [project, setProject] = useState(null);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [projectRef, projectInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const handleProjectClick = (project) => {
    setProject(project);
    setIsHovered(ProjectsData.projects.length);
  };

  const handleProjectHover = (hover) => {
    setIsHovered(hover);
  };

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

      <ProjectsContainer length={ProjectsData.projects.length} ref={projectRef}>
        {projectInView &&
          ProjectsData.projects.map((item, idx) => (
            <Project
              onClick={() => handleProjectClick(item)}
              onMouseEnter={() => handleProjectHover(idx)}
              onMouseLeave={() =>
                handleProjectHover(ProjectsData.projects.length)
              }
              key={idx}
              index={idx}
              isHovered={isHovered === idx}
              slide={idx > isHovered}
              projectClicked={project}
            >
              <Cover src={item.cover} />
              <CoverName>{item.name}</CoverName>
            </Project>
          ))}
      </ProjectsContainer>
      {project && (
        <>
          <DetailedProjectContainer>
            <CloseButton
              onClick={() => handleProjectClick(null)}
              color={themeColors[5]}
            >
              <i className="bi bi-x-lg"></i>
            </CloseButton>
            <video
              width="100%"
              height="auto"
              constrols
              autoPlay
              loop
              playsinline
            >
              <source src={project.video} type="video/mp4" />
            </video>
            <Overlay></Overlay>
            <InfoContainer>
              <b style={{ color: themeColors[0], fontSize: "20px" }}>
                {project.name}
              </b>{" "}
              <br />
              <b style={{ color: themeColors[0] }}>Dates:</b> {project.dates}{" "}
              <br />
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
          </DetailedProjectContainer>
        </>
      )}
    </Container>
  );
};

export default Portfolio;
