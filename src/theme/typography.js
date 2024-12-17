import { createTheme } from "@mui/material/styles";
import { breakpoints } from "./breakpoints";
import { Oswald, Plus_Jakarta_Sans } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "500", "700"], style: "normal", variable: "--font-playfair" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["200", "300", "400", "500", "700"], style: "normal", variable: "--font-jakarta" });

const breakpointsTheme = createTheme({
  breakpoints,
});

const heading = {
  fontFamily: plusJakarta.style.fontFamily,
  fontWeight: "400",
  color: "#0e202a",
  msWordWrap: "break-word",
  wordWrap: "break-word",
};

const body = {
  fontFamily: plusJakarta.style.fontFamily,
  fontWeight: "300",
  fontSize: "16px",
  letterSpacing: 0,
  color: "#112033",
};

export const typography = () => {
  return {
    h1: {
      ...heading,
      fontSize: "3.625rem",
      lineHeight: "1.17021em",
      [breakpointsTheme.breakpoints.down("xxl")]: {
        fontSize: "47px",
        lineHeight: "1.4",
      },
    },
    h1_serif: {
      ...heading,
      // fontFamily: playfairDisplay.style.fontFamily,
      fontSize: "47px",
      lineHeight: "1.17021em",
      [breakpointsTheme.breakpoints.down("xxl")]: {
        fontSize: "3.625rem",
        lineHeight: "1.4",
      },
    },
    h2: {
      ...heading,
      fontSize: "40px",
      lineHeight: "1.2em",
      [breakpointsTheme.breakpoints.down("xxl")]: {
        fontSize: "35px",
        lineHeight: "43px",
      },
    },
    h3: {
      ...heading,
      fontSize: "33px",
      lineHeight: "1.24242em",
      [breakpointsTheme.breakpoints.down("xxl")]: {
        fontSize: "28px",
        lineHeight: "36px",
      },
    },
    h4: {
      ...heading,
      fontSize: "27px",
      lineHeight: "1.2963em",
      [breakpointsTheme.breakpoints.down("xxl")]: {
        fontSize: "25px",
        lineHeight: "33px",
      },
    },
    h5: {
      ...heading,
      fontSize: "23px",
      lineHeight: "1.21739em",
      [breakpointsTheme.breakpoints.down("xxl")]: {
        fontSize: "20px",
        lineHeight: "25px",
      },
    },
    h6: {
      ...heading,
      fontSize: "13px",
      lineHeight: "1.15385em",
      textTransform: "uppercase",
      /* [breakpointsTheme.breakpoints.down("xxl")]: {

        }, */
    },
    body: {
      ...body,
    },
  };
};
