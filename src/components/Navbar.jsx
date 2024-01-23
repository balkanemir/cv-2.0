import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: calc(100vw - 40px);
  height: 40px;
  background-color: #ffffff56;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px 0 5px;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
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
`;

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const themeColors = useSelector((state) => state.theme.themeColors).split(
    ","
  );

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
    <Container style={{ opacity: `calc(0 + ${scrollY / 1000})` }}>
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
