import React from "react";
import styled from "styled-components";

import { Main } from "components/layout";
import { Hero, HomeFeature } from "module/home";

const StyledHomePage = styled.div``;

const HomePage = () => {
  return (
    <StyledHomePage>
      <Main>
        <Hero />
        <HomeFeature></HomeFeature>
        {/* <HomeNewest></HomeNewest> */}
      </Main>
    </StyledHomePage>
  );
};

export default HomePage;
