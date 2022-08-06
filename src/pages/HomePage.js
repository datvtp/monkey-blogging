import React from "react";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";

import Hero from "module/home/Hero";
import Main from "components/layout/Main";

const StyledHomePage = styled.div``;

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <StyledHomePage>
      <Main>
        <Hero />
      </Main>
    </StyledHomePage>
  );
};

export default HomePage;
