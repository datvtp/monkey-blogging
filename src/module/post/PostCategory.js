import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledPostCategory = styled.div`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  color: ${(props) => props.theme.grey6B};
  font-size: 14px;
  font-weight: 600;
  a {
    display: block;
  }

  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.greyF3};
    `};

  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
`;

const PostCategory = ({
  children,
  type = "primary",
  className = "",
  to = "/",
}) => {
  return (
    <StyledPostCategory type={type} className={`post-category ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </StyledPostCategory>
  );
};

export default PostCategory;
