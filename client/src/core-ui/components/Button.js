import styled from "styled-components";
import { variant } from "styled-system";

export const Button = styled("button")(
  {
    border: "none",
    borderRadius: 4,
    font: "inherit",
    padding: "16px 24px",
    "&:hover": {
      transform: "translate3d(0px, -2px, 0px)",
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 6px 0px",
      cursor: "pointer"
    },
    "&:disabled": {
      backgroundColor: "gray",
      borderColor: "lightgray",
      color: "lightgray",
      cursor: "not-allowed"
    }
  },
  variant({
    scale: "buttons",
    variants: {
      primary: {
        color: "#282C35",
        bg: "#09D3AC"
      }
    }
  })
);
