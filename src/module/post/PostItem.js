import React from "react";
import styled from "styled-components";

import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";

const StyledPostItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }

    &-category {
      margin-bottom: 12px;
    }

    &-title {
      margin-bottom: 16px;
    }
  }

  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;

const PostItem = () => {
  return (
    <StyledPostItem>
      <PostImage
        url="https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80"
        alt=""
        to="/"
      />

      <PostCategory>ReactJS</PostCategory>
      <PostTitle>
        The complete guide to learn new languages for beginners.
      </PostTitle>
      <PostMeta></PostMeta>
    </StyledPostItem>
  );
};

export default PostItem;
