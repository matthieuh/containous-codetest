import React from "react";
import styled from "styled-components";
import css from "@styled-system/css";

const ICON_SIZE = 15;

export const Select = ({ children, value, onChange, variant, ...props }) => {
  return (
    <Wrapper>
      <StyledSelect
        {...props}
        value={value}
        onChange={onChange}
        variant={variant}
      >
        {children}
      </StyledSelect>
      <IconWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={ICON_SIZE}
          height={ICON_SIZE}
          viewBox="0 0 15 15"
          fill="none"
          stroke="currentColor"
          style={{
            display: "block"
          }}
        >
          <path
            d="M14.5 5.5L12.5 3.5L10.5 5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 9.5L12.5 11.5L10.5 9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconWrapper>
    </Wrapper>
  );
};

const StyledSelect = styled("select")(
  css({
    appearance: "none",
    backgroundColor: "transparent",
    height: 5,
    lineHeight: 1,
    fontFamily: "normal",
    padding: 0,
    fontSize: 2,
    borderRadius: 0,
    paddingRight: 3,
    border: "none",
    outline: "none",
    width: "100%",
    borderBottom: "1px solid",
    borderColor: "gray",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    "&:focus": {
      borderColor: "primary",
      outline: "none"
    }
  })
);

const Wrapper = styled("div")({ position: "relative" });

const IconWrapper = styled("div")(
  css({
    position: "absolute",
    top: 0,
    right: 0,
    width: `${ICON_SIZE}px`,
    height: "100%",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none"
  })
);
