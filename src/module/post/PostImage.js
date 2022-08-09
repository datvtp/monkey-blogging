import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledPostImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;

const PostImage = ({ className = "", url = "", alt = "", to = null }) => {
  if (to)
    return (
      <NavLink to={to} style={{ display: "block" }}>
        <StyledPostImage className={`post-image ${className}`}>
          <img src={url} alt={alt} loading="lazy" />
        </StyledPostImage>
      </NavLink>
    );

  return (
    <StyledPostImage className={`post-image ${className}`}>
      <img src={url} alt={alt} loading="lazy" />
    </StyledPostImage>
  );
};

export default PostImage;
