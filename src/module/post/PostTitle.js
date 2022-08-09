import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledPostTitle = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  a {
    display: block;
  }

  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `};
`;

const PostTitle = ({ children, className = "", size = "normal", to = "/" }) => {
  return (
    <StyledPostTitle size={size} className={`post-title ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </StyledPostTitle>
  );
};

export default PostTitle;
