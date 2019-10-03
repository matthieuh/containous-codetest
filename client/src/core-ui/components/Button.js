import styled from "styled-components";
import { variant } from "styled-system";

export const Button = styled("button")(
  {
    border: "none",
    font: "inherit",
    padding: "16px 24px"
  },
  variant({
    scale: "buttons",
    variants: {
      primary: {
        color: '#282C35',
        bg: '#09D3AC',
      }
    }
  })
);
