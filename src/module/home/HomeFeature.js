import React from "react";
import styled from "styled-components";

import { Heading } from "components/layout";
import { PostFeatureItem } from "module/post";

const StyledHomeFeature = styled.div``;

const HomeFeature = () => {
  return (
    <StyledHomeFeature className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </StyledHomeFeature>
  );
};

export default HomeFeature;
