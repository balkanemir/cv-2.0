import "./App.css";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Futura from "./FuturaCyrillicBold.ttf";
import {
  changeTheme,
  setResponsiveValues,
} from "../src/store/Slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Futura';
    src: url(${Futura}) format('ttf');
    font-weight: normal;
    font-style: normal;;
    font-display: block;
  }
`;

const App = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem("theme")) {
    dispatch(changeTheme(localStorage.getItem("theme")));
  }
  const screenWidth = window.innerWidth;
  if (screenWidth > 1050) {
    dispatch(setResponsiveValues([56, 36, 30, 60, 70]));
  } else if (screenWidth > 650 && screenWidth < 1050) {
    dispatch(setResponsiveValues([36, 24, 24, 42, 50]));
  } else if (screenWidth > 400 && screenWidth < 650) {
    dispatch(setResponsiveValues([36, 18, 16, 30, 30]));
  } else if (screenWidth < 400) {
    dispatch(setResponsiveValues([36, 18, 16, 24, 30]));
  }
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
};

export default App;
