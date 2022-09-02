import styled from "styled-components";
import React from "react";

import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";

const StyledPostFeatureItem = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }

    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background-color: rgba(0, 0, 0, 0.75);
      mix-blend-mode: multiply;
      opacity: 0.6;
    }

    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }

    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }

  @media screen and (max-width: 1023.98px) {
    .post {
      &-content {
        padding: 15px;
      }
    }
  }
`;

const PostFeatureItem = ({ data }) => {
  if (!data || !data.id) return null;

  const date = new Date(data?.createdAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VN");

  return (
    <StyledPostFeatureItem>
      <PostImage url={data.image} alt="post-image" />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {data.category?.name && (
            <PostCategory to={data.category.slug}>
              {data.category.name.toLowerCase()}
            </PostCategory>
          )}
          <PostMeta
            authorName={data.user?.fullname}
            date={formatDate}
            to={data.user.username}
          ></PostMeta>
        </div>
        <PostTitle size="big">{data.title}</PostTitle>
      </div>
    </StyledPostFeatureItem>
  );
};

export default PostFeatureItem;
