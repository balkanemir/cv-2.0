import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: calc(100vw - 20px);
  height: 40px;
  background-color: #ffffff56;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px 0 5px;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  transition: 0.5s all;
`;

const SubContainer = styled.div`
  width: 40%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Button = styled.button`
  flex: 1;
  height: 30px;
  border: none;
  margin: 5px;
  background-color: transparent;
  font-size: 14px;
  font-family: "MontSerrat";
  font-weight: 600;
  color: ${(props) => props.themeColor};
  cursor: pointer;
  @media (max-width: 1050px) {
    font-size: 12px;
  }
  @media (max-width: 650px) {
    display: none;
  }
`;

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const themeColors = useSelector((state) => state.theme.themeColors).split(
    ","
  );

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > prevScrollY) {
      setIsHidden(true);
    } else if (currentScrollY < prevScrollY) {
      setIsHidden(false);
    }

    setPrevScrollY(currentScrollY);
    setScrollY(currentScrollY);
  };
  console.log(isHidden);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <Container
      style={{
        opacity: `calc(0 + ${scrollY / 1000})`,
        transform: isHidden ? `translateY(-100px)` : "translateY(0)",
      }}
    >
      <SubContainer>
        <Button themeColor={themeColors[6]}>About/Mindset</Button>
        <Button themeColor={themeColors[6]}>Skillset</Button>
        <Button themeColor={themeColors[6]}>Portfolio</Button>
      </SubContainer>
      <SubContainer>
        <Button themeColor={themeColors[6]}>Experience</Button>
        <Button themeColor={themeColors[6]}>Education</Button>
        <Button themeColor={themeColors[6]}>Contact</Button>
      </SubContainer>
    </Container>
  );
};

export default Navbar;
