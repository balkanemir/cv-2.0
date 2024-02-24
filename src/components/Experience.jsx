import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import ExperineceData from "../Experience.json";

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

const ShakingAnimation = keyframes`
  0% {
    transform: perspective(1200px) rotateY(0deg);
  }
  25% {
    transform: perspective(1200px) rotateY(-10deg);
  }
  50% {
    transform: perspective(1200px) rotateX(10deg);
  }
  75% {
    transform: perspective(1200px) rotateX(-10deg);
  }
  100% {
    transform: perspective(1200px) rotateY(0deg);
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.bgColor};
  transition: 0.5s all;
  position: relative;
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
  transition: 0.5s all;
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
  transition: 0.2s all;
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
  transition: 0.5s all;
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

const CardContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1050px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  width: 350px;
  height: 200px;
  margin: 10px;
  box-shadow: 0 0 10px 2px lightgray;
  animation: ${ShakingAnimation} 10s linear infinite;
  opacity: ${(props) => (props.inViewCard ? "1" : "0")};
  animation-delay: ${(props) => props.delay * 3}s;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  cursor: pointer;
  transition: 0.5s all;
  &:hover {
    box-shadow: 0 0 20px 4px gray;
  }
`;

const Logo = styled.img`
  width: auto;
  height: 30%;
  position: absolute;
  left: 20px;
  top: 20px;
`;

const CompanyName = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  top: 40px;
  left: 100px;
  color: ${(props) => props.color};
  font-size: 16px;
  font-family: "Montserrat";
  font-weight: 700;
`;

const Myname = styled.div`
  width: 50%;
  height: auto;
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: ${(props) => props.color};
  font-size: 14px;
  font-family: "Montserrat";
  font-weight: 700;
`;

const Role = styled.div`
  width: 50%;
  height: auto;
  position: absolute;
  bottom: 40px;
  left: 20px;
  color: ${(props) => props.color};
  font-size: 10px;
  font-family: "Montserrat";
  font-weight: 700;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 20%;
  position: absolute;
  top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  width: 50%;
  height: calc(80% - 60px);
  display: grid;
  grid-template-rows: 25% 25% 25% 25%;
  grid-template-columns: 50% 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Montserrat";
  color: ${(props) => props.color};
  padding: 20px;
  box-sizing: border-box;
  @media (max-width: 1050px) {
    width: 100%;
  }
`;

const LogoDetailed = styled.img`
  width: 5%;
  height: auto;
  margin-top: 20px;
  opacity: 0;
  animation: ${FadeInAnimation} 1s ease forwards;
  animation-delay: 0.2s;
  @media (max-width: 1050px) {
    width: 10%;
  }
`;

const NameDetailed = styled.div`
  width: auto;
  height: auto;
  font-size: 20px;
  font-family: "Montserrat";
  margin-top: 20px;
  color: ${(props) => props.color};
  opacity: 0;
  animation: ${FadeInAnimation} 1s ease forwards;
  animation-delay: 0.4s;
`;

const GridTitle = styled.div`
  font-size: 14px;
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  font-weight: 700;
  font-family: "Futura";
  color: ${(props) => props.backgroundColor};
  background-color: ${(props) => props.color};
  padding: 2px 5px 2px 5px;
  @media (max-width: 650px) {
    font-size: 12px;
  }
`;

const DateContainer = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  position: relative;
  opacity: 0;
  animation: ${FadeInAnimation} 1s ease forwards;
  animation-delay: 0.6s;
`;

const Date = styled.div`
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  @media (max-width: 650px) {
    font-size: 14px;
  }
`;

const DaysContainer = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  position: relative;
  opacity: 0;
  animation: ${FadeInAnimation} 1s ease forwards;
  animation-delay: 0.8s;
`;

const Days = styled.div`
  font-size: 50px;
  font-weight: 700;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const TypeContainer = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  position: relative;
  opacity: 0;
  animation: ${FadeInAnimation} 1s ease forwards;
  animation-delay: 1s;
`;

const Type = styled.div`
  font-size: 30px;
  font-weight: 700;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  @media (max-width: 650px) {
    font-size: 22px;
  }
`;

const RoleContainer = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  position: relative;
  opacity: 0;
  animation: ${FadeInAnimation} 1s ease forwards;
  animation-delay: 1.2s;
`;

const RoleDetailed = styled.div`
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  @media (max-width: 650px) {
    font-size: 12px;
  }
`;

const ResponsibitiesContainer = styled.div`
  grid-row: 4 / 5;
  grid-column: 1 / 3;
  position: relative;
  opacity: 0;
  animation: ${FadeInAnimation} 1s ease forwards;
  animation-delay: 1.8s;
`;

const Responsibities = styled.div`
  font-size: 12px;
  font-weight: 700;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  @media (max-width: 650px) {
    font-size: 10px;
  }
`;

const LocationContainer = styled.div`
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  position: relative;
  opacity: 0;
  animation: ${FadeInAnimation} 1s ease forwards;
  animation-delay: 1.4s;
`;

const Location = styled.div`
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const ContributionContainer = styled.div`
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  position: relative;
  opacity: 0;
  animation: ${FadeInAnimation} 1s ease forwards;
  animation-delay: 1.6s;
`;

const Contribution = styled.div`
  font-size: 40px;
  font-weight: 700;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const BackButton = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  background-color: transparent;
  color: ${(props) => props.color};
  position: absolute;
  left: 20%;
  top: 10%;
  font-family: "Montserrat";
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 3;
  @media (max-width: 650px) {
    left: 5%;
  }
`;

const LinkedinLogo = styled.a`
  width: auto;
  height: auto;
  font-size: 20px;
  font-family: "Montserrat";
  margin-top: 10px;
  color: ${(props) => props.color};
  opacity: 0;
  animation: ${FadeInAnimation} 1s ease forwards;
  background-color: transparent;
  animation-delay: 0.5s;
  z-index: 3;
  cursor: pointer;
`;

const Experience = () => {
  const [isClicked, setIsClicked] = useState(null);

  const themeColors = useSelector((state) => state.theme.themeColors).split(
    ","
  );
  const [color, setColor] = useState(themeColors[0]);
  const [bgColor, setBgColor] = useState("white");
  const [days, setDays] = useState(0);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [refCard, inViewCard] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const handleClick = (company, color, bgColor) => {
    setIsClicked(company);
    setColor(color);
    setBgColor(bgColor);
  };

  useEffect(() => {
    if (isClicked) {
      for (let i = 0; i <= isClicked.daySpent; i++) {
        let duration =
          i < isClicked.daySpent * 0.9
            ? 20
            : 20 +
              ((i - isClicked.daySpent * 0.9) / (isClicked.daySpent * 0.1)) *
                20;
        setTimeout(() => {
          setDays(i);
        }, i * duration);
      }
    }
  }, [isClicked]);

  return (
    <Container ref={ref} bgColor={bgColor}>
      {!isClicked && (
        <>
          <SubContainer>
            {inView && (
              <>
                <MainTitle color={color}>Experience.</MainTitle>
                <Content color={color}>This is where i improve myself.</Content>
              </>
            )}
          </SubContainer>{" "}
          <CardContainer ref={refCard}>
            {ExperineceData.companies.map((company, idx) => (
              <Card
                inViewCard={inViewCard}
                backgroundColor={company.backgroundColor}
                color={company.color}
                delay={idx}
                onClick={() =>
                  handleClick(company, company.color, company.backgroundColor)
                }
              >
                <Logo src={company.logo} />
                <CompanyName>{company.name}</CompanyName>
                <Role>{company.roles}</Role>
                <Myname>EMIR BALKAN</Myname>
              </Card>
            ))}
          </CardContainer>
        </>
      )}
      {isClicked && (
        <>
          <BackButton
            color={isClicked.color}
            onClick={() => handleClick(null, themeColors[0], "white")}
          >
            <i class="bi bi-chevron-left"></i>Back
          </BackButton>
          <TopContainer>
            <LogoDetailed src={isClicked.logo} />
            <NameDetailed color={isClicked.color}>
              {isClicked.name}
            </NameDetailed>
            <LinkedinLogo
              color={isClicked.color}
              href={isClicked.linkedin}
              target="blank"
            >
              <i class="bi bi-linkedin"></i>
            </LinkedinLogo>
          </TopContainer>
          <InfoContainer color={isClicked.color}>
            <DateContainer>
              <Date>
                {isClicked.startDate} <br /> {isClicked.endDate}
              </Date>
              <GridTitle
                color={isClicked.color}
                backgroundColor={isClicked.backgroundColor}
              >
                Dates
              </GridTitle>
            </DateContainer>
            <DaysContainer>
              <Days>{days}</Days>
              <GridTitle
                color={isClicked.color}
                backgroundColor={isClicked.backgroundColor}
              >
                Day Spent
              </GridTitle>
            </DaysContainer>
            <TypeContainer>
              <Type>{isClicked.type}</Type>
              <GridTitle
                color={isClicked.color}
                backgroundColor={isClicked.backgroundColor}
              >
                Work Type
              </GridTitle>
            </TypeContainer>
            <RoleContainer>
              <RoleDetailed>{isClicked.roles}</RoleDetailed>
              <GridTitle
                color={isClicked.color}
                backgroundColor={isClicked.backgroundColor}
              >
                Role
              </GridTitle>
            </RoleContainer>
            <ResponsibitiesContainer>
              <Responsibities>{isClicked.responsibilities}</Responsibities>
              <GridTitle
                color={isClicked.color}
                backgroundColor={isClicked.backgroundColor}
              >
                Keywords
              </GridTitle>
            </ResponsibitiesContainer>
            <LocationContainer>
              <Location>{isClicked.location}</Location>
              <GridTitle
                color={isClicked.color}
                backgroundColor={isClicked.backgroundColor}
              >
                Location
              </GridTitle>
            </LocationContainer>
            <ContributionContainer>
              <Contribution>{isClicked.projectsContributed}</Contribution>
              <GridTitle
                color={isClicked.color}
                backgroundColor={isClicked.backgroundColor}
              >
                Projects
              </GridTitle>
            </ContributionContainer>
          </InfoContainer>
        </>
      )}
    </Container>
  );
};

export default Experience;
